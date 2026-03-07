"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Timeline } from "@/components/timeline";

export default function ExperienceSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const sectionBg = isDark ? "bg-zinc-950" : "bg-slate-200";
    const titleColor = isDark ? "text-white" : "text-slate-900";
    const labelColor = isDark ? "text-gray-400" : "text-slate-500";
    const textColor = isDark ? "text-neutral-300" : "text-neutral-700";

    const data = [
        {
            title: "2025-present",
            content: (
                <div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${titleColor}`}>
                        Blockchain and Public Relations Core
                    </h3>
                    <h4 className={`text-base md:text-lg font-medium mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        GDG Charusat
                    </h4>
                    <p className={`mb-8 text-sm md:text-base font-normal ${textColor}`}>
                        Conducting Blockchain events, spreading knowledge on WEB3 and Decentralized
                        technology and handling public relations for GDG Charusat.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Add relevant images/screenshots here if needed */}
                    </div>
                </div>
            ),
        },
        {
            title: "summer 2025",
            content: (
                <div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${titleColor}`}>
                        Software Developer Intern
                    </h3>
                    <h4 className={`text-base md:text-lg font-medium mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        Intuitive Data System (IDS)
                    </h4>
                    <p className={`mb-8 text-sm md:text-base font-normal ${textColor}`}>
                        Built frontend components using Next.js,TypeScript, Tailwind for 
                        blockchain-based web portals. Learned and applied GraphQL API integration 
                        via Apollo Client. Contributed to deployment bug fixes while gaining 
                        hands-on exposure to Git workflows and CI/CD pipelines.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section
            id="experience"
            className={`${sectionBg} min-h-screen py-24 pb-32 transition-colors duration-500`}
        >
            <div className="max-w-7xl w-full mx-auto px-6 mb-12">
                <motion.p
                    className={`${labelColor} text-sm uppercase tracking-widest mb-3`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Experience
                </motion.p>
                <motion.h2
                    className={`${titleColor} text-3xl md:text-4xl font-bold transition-colors duration-500`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    My Journey
                </motion.h2>
            </div>

            <Timeline data={data} />

        </section>
    );
}
