import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Initialize rate limiting map
const rateLimiter = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

// Clean up old entries periodically to prevent memory leaks in the Map
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimiter.entries()) {
        if (now - data.windowStart > RATE_LIMIT_WINDOW) {
            rateLimiter.delete(ip);
        }
    }
}, RATE_LIMIT_WINDOW);

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || 'unknown-ip';

        // Check rate limit
        const now = Date.now();
        let clientData = rateLimiter.get(ip);
        if (!clientData || now - clientData.windowStart > RATE_LIMIT_WINDOW) {
            clientData = { count: 1, windowStart: now };
        } else {
            clientData.count++;
        }
        rateLimiter.set(ip, clientData);

        if (clientData.count > MAX_REQUESTS) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const { firstname, lastname, email, subject, message, token, honeypot } = await req.json();

        // Honeypot check: If honeypot is filled, return success silently back to the client.
        if (honeypot) {
            return NextResponse.json({ success: true, message: "Message sent successfully" });
        }

        // Validation
        if (!firstname || !lastname || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        if (message.length < 10 || message.length > 5000) {
            return NextResponse.json({ error: "Message must be between 10 and 5000 characters" }, { status: 400 });
        }

        if (!token) {
            return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 400 });
        }

        // Verify reCAPTCHA token
        const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success || verifyData.score < 0.5 || verifyData.action !== "contact") {
            return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 403 });
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const toEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            replyTo: email,
            subject: `Portfolio Contact: ${subject || "New Message"}`,
            text: `Name: ${firstname} ${lastname}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px;">
                    <h3>New Contact Message from your Portfolio</h3>
                    <p><strong>Name:</strong> ${firstname} ${lastname}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
        console.error("Contact Form Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
