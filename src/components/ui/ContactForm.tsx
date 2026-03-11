"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitAction = async () => {
        setStatus("loading");
        setErrorMessage("");

        try {
            // @ts-ignore
            if (typeof window === "undefined" || !window.grecaptcha) {
                throw new Error("reCAPTCHA not loaded");
            }

            // @ts-ignore
            const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "contact" });

            const payload = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                token: token,
                honeypot: formData.website,
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "", website: "" });
        } catch (error: any) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="flex flex-col gap-5 max-w-xl w-full mx-auto p-6 lg:p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800">
            <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">Get in Touch</h2>
                <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base">
                    Drop a message and I'll get back to you as soon as possible.
                </p>
            </div>

            {/* Hidden honeypot field for bot protection */}
            <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
            />

            <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium dark:text-zinc-300 text-slate-700">Name</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                    maxLength={100}
                    placeholder="John Doe"
                    className="p-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium dark:text-zinc-300 text-slate-700">Email</label>
                <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    maxLength={100}
                    placeholder="john@example.com"
                    className="p-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium dark:text-zinc-300 text-slate-700">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can I help you?"
                    className="p-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                />
            </div>

            <button
                onClick={submitAction}
                disabled={status === "loading" || !formData.name || !formData.email || !formData.message}
                className="mt-4 p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                type="button"
            >
                {status === "loading" ? "Sending Message..." : "Send Message"}
            </button>

            {status === "success" && (
                <div className="mt-2 p-3 bg-green-50 text-green-700 border border-green-200 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-sm text-center font-medium">
                    Thanks for reaching out! Your message was sent successfully.
                </div>
            )}

            {status === "error" && (
                <div className="mt-2 p-3 bg-red-50 text-red-600 border border-red-200 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm text-center font-medium">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
