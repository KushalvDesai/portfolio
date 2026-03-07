"use client";

import { Folder, File, ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import type { ContentItem } from "@/lib/github";

interface FileTreeProps {
    items: ContentItem[];
    currentPath: string;
    onNavigate: (path: string) => void;
    onFileSelect: (path: string) => void;
    isLoading?: boolean;
}

export default function FileTree({
    items,
    currentPath,
    onNavigate,
    onFileSelect,
    isLoading,
}: FileTreeProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Sort: directories first, then files, alphabetical within each group
    const sorted = [...items].sort((a, b) => {
        if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name);
    });

    // Build breadcrumb segments
    const pathSegments = currentPath
        ? currentPath.split("/").filter(Boolean)
        : [];

    const hoverBg = isDark
        ? "hover:bg-zinc-800/60"
        : "hover:bg-slate-100";
    const borderColor = isDark ? "border-zinc-800" : "border-slate-200";

    return (
        <div
            className={`rounded-xl border ${borderColor} overflow-hidden ${isDark ? "bg-zinc-900/50" : "bg-white"
                }`}
        >
            {/* Breadcrumb */}
            <div
                className={`flex items-center gap-1 px-4 py-2.5 text-xs border-b ${borderColor} ${isDark ? "bg-zinc-900" : "bg-slate-50"
                    } overflow-x-auto`}
            >
                <button
                    onClick={() => onNavigate("")}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${hoverBg} ${isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                >
                    <Home className="w-3.5 h-3.5" />
                    <span>root</span>
                </button>
                {pathSegments.map((seg, i) => {
                    const segPath = pathSegments.slice(0, i + 1).join("/");
                    const isLast = i === pathSegments.length - 1;
                    return (
                        <span key={segPath} className="flex items-center gap-1">
                            <ChevronRight
                                className={`w-3 h-3 ${isDark ? "text-zinc-600" : "text-slate-400"
                                    }`}
                            />
                            <button
                                onClick={() => !isLast && onNavigate(segPath)}
                                className={`px-1.5 py-0.5 rounded transition-colors ${isLast
                                        ? isDark
                                            ? "text-zinc-300 font-medium"
                                            : "text-slate-700 font-medium"
                                        : `${isDark ? "text-blue-400" : "text-blue-600"} ${hoverBg}`
                                    }`}
                                disabled={isLast}
                            >
                                {seg}
                            </button>
                        </span>
                    );
                })}
            </div>

            {/* File list */}
            <div className="divide-y divide-transparent">
                {isLoading ? (
                    <div className="px-4 py-8 text-center">
                        <div
                            className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent ${isDark ? "text-zinc-500" : "text-slate-400"
                                }`}
                        />
                    </div>
                ) : sorted.length === 0 ? (
                    <div
                        className={`px-4 py-8 text-center text-sm ${isDark ? "text-zinc-500" : "text-slate-400"
                            }`}
                    >
                        Empty directory
                    </div>
                ) : (
                    sorted.map((item, i) => (
                        <motion.button
                            key={item.path}
                            onClick={() =>
                                item.type === "dir"
                                    ? onNavigate(item.path)
                                    : onFileSelect(item.path)
                            }
                            className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${hoverBg} ${isDark
                                    ? "border-b border-zinc-800/50"
                                    : "border-b border-slate-100"
                                }`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02, duration: 0.2 }}
                        >
                            {item.type === "dir" ? (
                                <Folder
                                    className={`h-4 w-4 flex-shrink-0 ${isDark ? "text-blue-400" : "text-blue-500"
                                        }`}
                                />
                            ) : (
                                <File
                                    className={`h-4 w-4 flex-shrink-0 ${isDark ? "text-zinc-500" : "text-slate-400"
                                        }`}
                                />
                            )}
                            <span
                                className={`truncate ${isDark ? "text-zinc-200" : "text-slate-700"
                                    }`}
                            >
                                {item.name}
                            </span>
                            {item.type === "dir" && (
                                <ChevronRight
                                    className={`ml-auto h-3.5 w-3.5 flex-shrink-0 ${isDark ? "text-zinc-600" : "text-slate-400"
                                        }`}
                                />
                            )}
                        </motion.button>
                    ))
                )}
            </div>
        </div>
    );
}
