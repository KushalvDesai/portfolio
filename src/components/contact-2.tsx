"use client";

import React, { useState } from "react";
import { Copy, Check, Github, Linkedin, X } from "lucide-react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";

interface Contact2Props {
  title?: string;
  description?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

export const Contact2 = ({
  title = "Contact Me",
  description = "I am available for questions, feedback, or collaboration opportunities. Let me know how I can help!",
  email = "kushal.desaiofficial@gmail.com",
  github = "https://github.com/KushalvDesai",
  linkedin = "https://linkedin.com/in/kushalvdesai",
}: Contact2Props) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null, message: string }>({ type: null, message: "" });


  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
        setFormData({ firstname: "", lastname: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Toast Notification */}
            {copied && (
              <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-md bg-[#0F9D58] px-4 py-2 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-top-4">
                <Check className="h-4 w-4" />
                <span>Link copied!</span>
                <button onClick={() => setCopied(false)} className="ml-2 hover:opacity-80">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {submitStatus.type && (
              <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-top-4 ${submitStatus.type === "success" ? "bg-[#0F9D58]" : "bg-destructive"}`}>
                {submitStatus.type === "success" && <Check className="h-4 w-4" />}
                <span>{submitStatus.message}</span>
                <button onClick={() => setSubmitStatus({ type: null, message: "" })} className="ml-2 hover:opacity-80">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-none space-y-4">
                <li className="flex items-center gap-2">
                  <span className="font-bold w-20">Email: </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold w-20">GitHub: </span>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-muted-foreground">
                    <Github className="h-5 w-5" /> KushalvDesai
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold w-20">LinkedIn: </span>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-muted-foreground">
                    <Linkedin className="h-5 w-5" /> kushalvdesai
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10 bg-card/50">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name *</Label>
                <Input type="text" id="firstname" value={formData.firstname} onChange={handleInputChange} placeholder="First Name" required />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name *</Label>
                <Input type="text" id="lastname" value={formData.lastname} onChange={handleInputChange} placeholder="Last Name" required />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message *</Label>
              <Textarea placeholder="Type your message here." id="message" value={formData.message} onChange={handleInputChange} required className="min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
