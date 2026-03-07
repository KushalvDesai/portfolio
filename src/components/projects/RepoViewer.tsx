"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
    fetchRepo,
    fetchContents,
    fetchReadme,
    fetchLanguages,
    fetchFileContent,
    LANGUAGE_COLORS,
    type RepoMeta,
    type ContentItem,
    type Languages,
} from "@/lib/github";
import FileTree from "./FileTree";
import ReadmeViewer from "./ReadmeViewer";
import FilePreview from "./FilePreview";
import LanguageBar from "./LanguageBar";
import Link from "next/link";

interface RepoViewerProps {
    owner: string;
    repo: string;
}

export default function RepoViewer({ owner, repo }: RepoViewerProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Data state
    const [repoMeta, setRepoMeta] = useState<RepoMeta | null>(null);
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [readme, setReadme] = useState("");
    const [languages, setLanguages] = useState<Languages>({});

    // UI state
    const [currentPath, setCurrentPath] = useState("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState("");
    const [isLoadingTree, setIsLoadingTree] = useState(true);
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial data fetch
    useEffect(() => {
        async function load() {
            try {
                const [meta, tree, rm, langs] = await Promise.all([
                    fetchRepo(`${owner}/${repo}`),
                    fetchContents(`${owner}/${repo}`),
                    fetchReadme(`${owner}/${repo}`),
                    fetchLanguages(`${owner}/${repo}`),
                ]);
                setRepoMeta(meta);
                setContents(tree);
                setReadme(rm);
                setLanguages(langs);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load repository"
                );
            } finally {
                setIsLoadingTree(false);
            }
        }
        load();
    }, [owner, repo]);

    // Navigate folder
    const handleNavigate = useCallback(
        async (path: string) => {
            setCurrentPath(path);
            setSelectedFile(null);
            setIsLoadingTree(true);
            try {
                const tree = await fetchContents(`${owner}/${repo}`, path);
                setContents(tree);
            } catch {
                setContents([]);
            } finally {
                setIsLoadingTree(false);
            }
        },
        [owner, repo]
    );

    // Select file
    const handleFileSelect = useCallback(
        async (path: string) => {
            setSelectedFile(path);
            setIsLoadingFile(true);
            try {
                const content = await fetchFileContent(`${owner}/${repo}`, path);
                setFileContent(content);
            } catch {
                setFileContent("// Failed to load file content");
            } finally {
                setIsLoadingFile(false);
            }
        },
        [owner, repo]
    );

    const handleBackFromFile = () => {
        setSelectedFile(null);
        setFileContent("");
    };

    if (error) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${isDark ? "bg-zinc-950 text-zinc-400" : "bg-slate-100 text-slate-500"
                    }`}
            >
                <div className="text-center space-y-4">
                    <p className="text-lg">Failed to load repository</p>
                    <p className="text-sm opacity-60">{error}</p>
                    <Link
                        href="/"
                        className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors ${isDark
                            ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                            : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                            }`}
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const statsBg = isDark ? "bg-zinc-800/50" : "bg-slate-100";
    const statsText = isDark ? "text-zinc-300" : "text-slate-600";

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-zinc-950" : "bg-slate-100"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
                {/* Back link */}
                <Link
                    href="/#projects"
                    className={`inline-flex items-center gap-2 text-sm mb-6 px-3 py-1.5 rounded-lg transition-colors ${isDark
                        ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                        }`}
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Projects
                </Link>

                {/* Repo header */}
                {repoMeta ? (
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <h1
                                    className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                                        }`}
                                >
                                    <span className={isDark ? "text-zinc-500" : "text-slate-400"}>
                                        {repoMeta.owner.login}
                                    </span>
                                    <span className={isDark ? "text-zinc-600" : "text-slate-300"}>
                                        {" / "}
                                    </span>
                                    <span
                                        className={
                                            isDark
                                                ? "text-blue-400"
                                                : "text-blue-600"
                                        }
                                    >
                                        {repoMeta.name}
                                    </span>
                                </h1>
                                {repoMeta.description && (
                                    <p
                                        className={`mt-2 text-sm sm:text-base max-w-2xl ${isDark ? "text-zinc-400" : "text-slate-500"
                                            }`}
                                    >
                                        {repoMeta.description}
                                    </p>
                                )}
                            </div>
                            <a
                                href={repoMeta.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-colors ${isDark
                                    ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                    : "border-slate-300 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                View on GitHub
                            </a>
                        </div>

                        {/* Stats pills */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statsBg} ${statsText}`}
                            >
                                <Star className="h-3.5 w-3.5 text-amber-400" />
                                {repoMeta.stargazers_count.toLocaleString()}
                            </div>
                            <div
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statsBg} ${statsText}`}
                            >
                                <GitFork className="h-3.5 w-3.5" />
                                {repoMeta.forks_count.toLocaleString()}
                            </div>
                            {repoMeta.language && (
                                <div
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statsBg} ${statsText}`}
                                >
                                    <span
                                        className="h-2.5 w-2.5 rounded-full inline-block"
                                        style={{
                                            backgroundColor:
                                                LANGUAGE_COLORS[repoMeta.language] || "#6b7280",
                                        }}
                                    />
                                    {repoMeta.language}
                                </div>
                            )}
                        </div>

                        {/* Language bar */}
                        {Object.keys(languages).length > 0 && (
                            <div className="mt-6">
                                <LanguageBar languages={languages} />
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* Loading skeleton */
                    <div className="mb-8 space-y-4 animate-pulse">
                        <div
                            className={`h-8 w-64 rounded ${isDark ? "bg-zinc-800" : "bg-slate-200"
                                }`}
                        />
                        <div
                            className={`h-4 w-96 rounded ${isDark ? "bg-zinc-800" : "bg-slate-200"
                                }`}
                        />
                        <div className="flex gap-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-7 w-20 rounded-full ${isDark ? "bg-zinc-800" : "bg-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Main content: sidebar + panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* File tree sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="lg:sticky lg:top-8">
                            <FileTree
                                items={contents}
                                currentPath={currentPath}
                                onNavigate={handleNavigate}
                                onFileSelect={handleFileSelect}
                                isLoading={isLoadingTree}
                            />

                            {/* GitHub Stats Card */}
                            {repoMeta && (
                                <div className="mt-6">
                                    <img
                                        src={`https://github-readme-stats.vercel.app/api?username=${owner}&show_icons=true&theme=${isDark ? "github_dark" : "default"
                                            }&hide_border=true&bg_color=${isDark ? "18181b" : "f8fafc"
                                            }&border_radius=12`}
                                        alt={`${owner}'s GitHub stats`}
                                        className="w-full rounded-xl"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main panel */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        {selectedFile ? (
                            <FilePreview
                                filePath={selectedFile}
                                content={fileContent}
                                isLoading={isLoadingFile}
                                onBack={handleBackFromFile}
                            />
                        ) : (
                            <ReadmeViewer content={readme} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
