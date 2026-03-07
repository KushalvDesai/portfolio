"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LANGUAGE_COLORS, type Languages } from "@/lib/github";
import { useTheme } from "@/components/ThemeProvider";

interface LanguageBarProps {
    languages: Languages;
}

export default function LanguageBar({ languages }: LanguageBarProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [hoveredLang, setHoveredLang] = useState<string | null>(null);

    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    const entries = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .map(([lang, bytes]) => ({
            lang,
            bytes,
            pct: ((bytes / total) * 100).toFixed(1),
            color: LANGUAGE_COLORS[lang] || (isDark ? "#6b7280" : "#9ca3af"),
        }));

    return (
        <div className="space-y-3">
            {/* Bar */}
            <div
                className={`flex h-2.5 w-full overflow-hidden rounded-full ${isDark ? "bg-zinc-800" : "bg-slate-200"
                    }`}
            >
                {entries.map(({ lang, pct, color }) => (
                    <motion.div
                        key={lang}
                        className="h-full transition-opacity"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onMouseEnter={() => setHoveredLang(lang)}
                        onMouseLeave={() => setHoveredLang(null)}
                        title={`${lang}: ${pct}%`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {entries.map(({ lang, pct, color }) => (
                    <button
                        key={lang}
                        className={`flex items-center gap-1.5 text-xs transition-opacity ${hoveredLang && hoveredLang !== lang ? "opacity-40" : "opacity-100"
                            } ${isDark ? "text-zinc-300" : "text-slate-600"}`}
                        onMouseEnter={() => setHoveredLang(lang)}
                        onMouseLeave={() => setHoveredLang(null)}
                    >
                        <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        <span className="font-medium">{lang}</span>
                        <span className={isDark ? "text-zinc-500" : "text-slate-400"}>
                            {pct}%
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
