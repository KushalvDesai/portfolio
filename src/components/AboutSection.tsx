"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Blocks, Globe, Rocket, Terminal, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/* ── Animated sub-components ── */

function CodeTyper({ isDark }: { isDark: boolean }) {
    const lines = [
        "const dev = {",
        '  name: "Kushal",',
        '  focus: "Web3",',
        "  passion: true,",
        "};",
    ];
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleLines((prev) => (prev >= lines.length ? 0 : prev + 1));
        }, 800);
        return () => clearInterval(interval);
    }, [lines.length]);

    return (
        <div className="flex items-center justify-center h-full font-mono text-sm">
            <pre className="text-left">
                {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={isDark ? "text-emerald-400" : "text-emerald-600"}
                    >
                        {line}
                    </motion.div>
                ))}
                <span className={`animate-blink ${isDark ? "text-white" : "text-slate-800"}`}>▌</span>
            </pre>
        </div>
    );
}

function BlockchainBlocks({ isDark }: { isDark: boolean }) {
    const [activeBlock, setActiveBlock] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBlock((prev) => (prev + 1) % 4);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-full gap-2">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${i <= activeBlock ? "bg-purple-500/30" : isDark ? "bg-white/5" : "bg-slate-100"
                        }`}
                    animate={{
                        scale: i === activeBlock ? 1.15 : 1,
                        borderColor:
                            i === activeBlock
                                ? "rgba(168,85,247,0.6)"
                                : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    }}
                    style={{ border: "1px solid" }}
                    transition={{ duration: 0.3 }}
                >
                    <Blocks
                        className={`w-4 h-4 ${i <= activeBlock ? (isDark ? "text-purple-300" : "text-purple-600") : isDark ? "text-white/20" : "text-slate-300"
                            }`}
                    />
                </motion.div>
            ))}
        </div>
    );
}

function NetworkPulse({ isDark }: { isDark: boolean }) {
    return (
        <div className="flex items-center justify-center h-full relative">
            <Globe className={`w-14 h-14 z-10 ${isDark ? "text-white/80" : "text-cyan-600"}`} />
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className={`absolute w-14 h-14 border-2 rounded-full ${isDark ? "border-cyan-400/30" : "border-cyan-500/40"}`}
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

function RocketLaunch() {
    return (
        <div className="flex items-center justify-center h-full">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <Rocket className="w-12 h-12 text-orange-400" />
            </motion.div>
        </div>
    );
}

function TerminalAnimation({ isDark }: { isDark: boolean }) {
    const commands = [
        "$ npx hardhat compile",
        "Compiling 12 files...",
        "✓ Compiled successfully",
    ];
    const [line, setLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLine((prev) => (prev + 1) % commands.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [commands.length]);

    return (
        <div className="flex flex-col items-start justify-center h-full font-mono text-xs gap-1 px-2">
            <AnimatePresence mode="wait">
                <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={
                        line === 2 ? (isDark ? "text-emerald-400" : "text-emerald-600") : (isDark ? "text-zinc-400" : "text-slate-500")
                    }
                >
                    {commands[line]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

/* ── Main About Section ── */

export default function AboutSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const cardBg = isDark
        ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
        : "bg-white border-slate-300 hover:border-slate-400 shadow-md";
    const titleColor = isDark ? "text-white" : "text-slate-900";
    const descColor = isDark ? "text-gray-400" : "text-slate-500";
    const sectionBg = isDark ? "bg-zinc-950" : "bg-slate-200";
    const labelColor = isDark ? "text-gray-400" : "text-slate-500";

    return (
        <section
            id="about"
            className={`${sectionBg} px-6 py-24 pb-32 min-h-screen flex items-center justify-center transition-colors duration-500`}
        >
            <div className="max-w-7xl w-full mx-auto">
                <motion.p
                    className={`${labelColor} text-sm uppercase tracking-widest mb-3`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.p>
                <motion.h2
                    className={`${titleColor} text-3xl md:text-4xl font-bold mb-12 transition-colors duration-500`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    What I Do
                </motion.h2>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
                    {/* 1. Code — Tall (2×2) */}
                    <motion.div
                        className={`md:col-span-2 md:row-span-2 ${cardBg} border rounded-xl p-8 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex-1">
                            <CodeTyper isDark={isDark} />
                        </div>
                        <div className="mt-4">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Code className="w-5 h-5" />
                                Clean Code
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                Writing maintainable, scalable code with modern frameworks.
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. Blockchain — Standard (2×1) */}
                    <motion.div
                        className={`md:col-span-2 ${cardBg} border rounded-xl p-8 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <BlockchainBlocks isDark={isDark} />
                        </div>
                        <div className="mt-4">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Blocks className="w-5 h-5" />
                                Web3 & Blockchain
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                Smart contracts, DApps & decentralized systems.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Global Network — Tall (2×2) */}
                    <motion.div
                        className={`md:col-span-2 md:row-span-2 ${cardBg} border rounded-xl p-6 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <NetworkPulse isDark={isDark} />
                        </div>
                        <div className="mt-auto">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Globe className="w-5 h-5" />
                                Decentralized Web
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                Building for the open, permissionless internet.
                            </p>
                        </div>
                    </motion.div>

                    {/* 4. Fast Shipping — Standard (2×1) */}
                    <motion.div
                        className={`md:col-span-2 ${cardBg} border rounded-xl p-8 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <RocketLaunch />
                        </div>
                        <div className="mt-4">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Rocket className="w-5 h-5" />
                                Ship Fast
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                From idea to production in record time.
                            </p>
                        </div>
                    </motion.div>

                    {/* 5. DevTools — Wide (3×1) */}
                    <motion.div
                        className={`md:col-span-3 ${cardBg} border rounded-xl p-8 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1">
                            <TerminalAnimation isDark={isDark} />
                        </div>
                        <div className="mt-4">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Terminal className="w-5 h-5" />
                                DevOps & Tooling
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                CI/CD pipelines, Docker, testing — the full stack.
                            </p>
                        </div>
                    </motion.div>

                    {/* 6. Frontend — Wide (3×1) */}
                    <motion.div
                        className={`md:col-span-3 ${cardBg} border rounded-xl p-8 flex flex-col transition-colors cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <Sparkles className={`w-14 h-14 ${isDark ? "text-yellow-300" : "text-amber-500"}`} />
                        </div>
                        <div className="mt-4">
                            <h3 className={`text-xl font-bold flex items-center gap-2 ${titleColor}`}>
                                <Sparkles className="w-5 h-5" />
                                Pixel-Perfect UI
                            </h3>
                            <p className={`${descColor} text-sm mt-1`}>
                                Crafting stunning, responsive interfaces users love.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
