"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const roles = ["Web3 Developer", "Frontend Developer"];

export default function HeroSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Fade-in on mount
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Typewriter effect
    useEffect(() => {
        const current = roles[roleIndex];
        const speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            const pause = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(pause);
        }

        if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timer = setTimeout(() => {
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, speed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex]);

    const displayText = roles[roleIndex].substring(0, charIndex);

    return (
        <section
            className={`relative flex min-h-screen items-center justify-center overflow-hidden transition-colors duration-500 ${isDark ? "bg-black" : "bg-slate-50"
                }`}
        >
            {/* Cosmos background image — swaps based on theme */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
                style={{
                    backgroundImage: `url('${isDark ? "/cosmos-bg.png" : "/cosmos-bg-light.png"}')`,
                }}
            />
            {/* Overlay for text readability */}
            <div
                className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-black/40" : "bg-white/30"
                    }`}
            />
            {/* Vignette effect */}
            <div
                className={`absolute inset-0 ${isDark
                        ? "bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.7)_100%)]"
                        : "bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(255,255,255,0.5)_100%)]"
                    }`}
            />

            {/* Content */}
            <div
                className={`relative z-10 flex flex-col items-center gap-8 px-6 text-center transition-all duration-1000 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
            >
                {/* Name */}
                <div className="flex flex-col gap-3">
                    <h1
                        className={`text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl transition-colors duration-500 ${isDark ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Kushal{" "}
                        <span
                            className={`bg-clip-text text-transparent ${isDark
                                    ? "bg-gradient-to-r from-purple-400 via-violet-400 to-emerald-400"
                                    : "bg-gradient-to-r from-violet-600 via-purple-600 to-teal-500"
                                }`}
                        >
                            Desai
                        </span>
                    </h1>
                </div>

                {/* Typewriter role */}
                <div
                    className={`flex items-center gap-1 text-xl font-light sm:text-2xl md:text-3xl transition-colors duration-500 ${isDark ? "text-zinc-400" : "text-slate-500"
                        }`}
                >
                    <span className={isDark ? "text-zinc-500" : "text-slate-400"}>
                        {"<"}
                    </span>
                    <span
                        className={`font-mono ${isDark ? "text-zinc-300" : "text-slate-700"
                            }`}
                    >
                        {displayText}
                    </span>
                    <span
                        className={`animate-blink font-light ${isDark ? "text-purple-400" : "text-violet-500"
                            }`}
                    >
                        |
                    </span>
                    <span className={isDark ? "text-zinc-500" : "text-slate-400"}>
                        {"/>"}
                    </span>
                </div>

                {/* Divider */}
                <div
                    className={`h-px w-24 bg-gradient-to-r from-transparent to-transparent transition-colors duration-500 ${isDark ? "via-zinc-600" : "via-slate-300"
                        }`}
                />

                {/* Tagline */}
                <p
                    className={`max-w-lg text-lg leading-relaxed transition-colors duration-500 ${isDark ? "text-zinc-500" : "text-slate-500"
                        }`}
                >
                    #tagline
                </p>

                {/* CTA Buttons */}
                <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                    <a
                        href="#projects"
                        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 ${isDark
                                ? "bg-white text-black hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                                : "bg-slate-900 text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                            }`}
                    >
                        <span>View Projects</span>
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className={`inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isDark
                                ? "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10"
                                : "border-slate-300 bg-white/50 text-slate-700 hover:border-slate-400 hover:bg-white/80"
                            }`}
                    >
                        <span>Get in Touch</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
