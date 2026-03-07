"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
    fetchRepo,
    fetchLanguages,
    LANGUAGE_COLORS,
    type RepoMeta,
    type Languages,
} from "@/lib/github";
import Link from "next/link";

// ── Configure your repos here ──
const SHOWCASE_REPOS = [
    "KushalvDesai/MarkChain",
    "KushalvDesai/Decentralized-Prediction-Market",
    "KushalvDesai/portfolio",
    "WIBD-Vadodara/Umang",
    "Yash-Bharvada/CodeMate",
    "KushalvDesai/GlobeNomad",
    "KushalvDesai/stackit-1602",
];

interface RepoCardData {
    meta: RepoMeta;
    languages: Languages;
}

function RepoCard({ data }: { data: RepoCardData }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { meta, languages } = data;
    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    const topLangs = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([lang, bytes]) => ({
            lang,
            pct: ((bytes / total) * 100).toFixed(1),
            color: LANGUAGE_COLORS[lang] || "#6b7280",
        }));

    const cardBg = isDark
        ? "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
        : "bg-white border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-md";

    return (
        <Link href={`/projects/${meta.full_name}`}>
            <motion.div
                className={`group relative h-full border rounded-2xl p-6 transition-all duration-300 ${cardBg} flex flex-col`}
                whileHover={{ y: -4, scale: 1.01 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                {/* Glow effect on hover */}
                <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark
                        ? "bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent"
                        : "bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-transparent"
                        }`}
                />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Repo name */}
                    <h3
                        className={`text-lg font-semibold mb-2 ${isDark
                            ? "text-blue-400 group-hover:text-blue-300"
                            : "text-blue-600 group-hover:text-blue-500"
                            } transition-colors`}
                    >
                        {meta.name}
                    </h3>

                    {/* Description */}
                    {meta.description && (
                        <p
                            className={`text-sm mb-4 line-clamp-2 flex-grow ${isDark ? "text-zinc-400" : "text-slate-500"
                                }`}
                        >
                            {meta.description}
                        </p>
                    )}
                    {!meta.description && <div className="flex-grow" />}

                    {/* Language mini-bar */}
                    {topLangs.length > 0 && (
                        <div
                            className={`flex h-1.5 w-full overflow-hidden rounded-full mb-3 ${isDark ? "bg-zinc-800" : "bg-slate-200"
                                }`}
                        >
                            {topLangs.map(({ lang, pct, color }) => (
                                <div
                                    key={lang}
                                    className="h-full"
                                    style={{
                                        width: `${pct}%`,
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Bottom row: stats + languages */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span
                                className={`inline-flex items-center gap-1 text-xs ${isDark ? "text-zinc-500" : "text-slate-400"
                                    }`}
                            >
                                <Star className="h-3.5 w-3.5 text-amber-400" />
                                {meta.stargazers_count}
                            </span>
                            <span
                                className={`inline-flex items-center gap-1 text-xs ${isDark ? "text-zinc-500" : "text-slate-400"
                                    }`}
                            >
                                <GitFork className="h-3.5 w-3.5" />
                                {meta.forks_count}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {topLangs.slice(0, 2).map(({ lang, color }) => (
                                <span
                                    key={lang}
                                    className={`inline-flex items-center gap-1 text-xs ${isDark ? "text-zinc-500" : "text-slate-400"
                                        }`}
                                >
                                    <span
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Corner arrow */}
                <ExternalLink
                    className={`absolute top-5 right-5 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-zinc-600" : "text-slate-400"
                        }`}
                />
            </motion.div>
        </Link>
    );
}

export default function ProjectsSection() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [repos, setRepos] = useState<RepoCardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRepos() {
            try {
                const results = await Promise.all(
                    SHOWCASE_REPOS.map(async (repoName) => {
                        const [meta, languages] = await Promise.all([
                            fetchRepo(repoName),
                            fetchLanguages(repoName),
                        ]);
                        return { meta, languages };
                    })
                );
                setRepos(results);
            } catch (err) {
                console.error("Failed to load repos:", err);
            } finally {
                setLoading(false);
            }
        }
        loadRepos();
    }, []);

    const sectionBg = isDark ? "bg-zinc-950" : "bg-slate-100";
    const labelColor = isDark ? "text-gray-400" : "text-slate-500";
    const titleColor = isDark ? "text-white" : "text-slate-900";

    return (
        <section
            id="projects"
            className={`${sectionBg} px-6 py-24 pb-32 min-h-screen flex items-center justify-center transition-colors duration-500`}
        >
            <div className="max-w-7xl w-full mx-auto">
                <motion.p
                    className={`${labelColor} text-sm uppercase tracking-widest mb-3`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Projects
                </motion.p>
                <motion.h2
                    className={`${titleColor} text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    What I&apos;ve Built
                </motion.h2>
                <motion.p
                    className={`${labelColor} text-base mb-12 max-w-xl`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Click on any project to explore the full source code, file tree, and
                    README — right here on the site.
                </motion.p>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SHOWCASE_REPOS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-52 rounded-2xl animate-pulse ${isDark ? "bg-zinc-900" : "bg-slate-200"
                                    }`}
                            />
                        ))}
                    </div>
                ) : repos.length === 0 ? (
                    <p
                        className={`text-center text-sm ${isDark ? "text-zinc-500" : "text-slate-400"
                            }`}
                    >
                        No projects to display.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((data) => (
                            <RepoCard key={data.meta.name} data={data} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
