"use client";

import { ArrowLeft, FileCode, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface FilePreviewProps {
    filePath: string;
    content: string;
    isLoading?: boolean;
    onBack: () => void;
}

export default function FilePreview({
    filePath,
    content,
    isLoading,
    onBack,
}: FilePreviewProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [copied, setCopied] = useState(false);

    const fileName = filePath.split("/").pop() || filePath;
    const lines = content.split("\n");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const borderColor = isDark ? "border-zinc-800" : "border-slate-200";

    return (
        <div
            className={`rounded-xl border overflow-hidden ${borderColor} ${isDark ? "bg-zinc-900/50" : "bg-white"
                }`}
        >
            {/* Header */}
            <div
                className={`flex items-center justify-between px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-zinc-900" : "bg-slate-50"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <button
                        onClick={onBack}
                        className={`p-1 rounded-md transition-colors ${isDark
                                ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                                : "hover:bg-slate-200 text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <FileCode
                        className={`h-4 w-4 ${isDark ? "text-zinc-500" : "text-slate-400"
                            }`}
                    />
                    <span
                        className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-slate-600"
                            }`}
                    >
                        {fileName}
                    </span>
                    <span
                        className={`text-xs ${isDark ? "text-zinc-600" : "text-slate-400"}`}
                    >
                        {lines.length} lines
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors ${isDark
                            ? "hover:bg-zinc-800 text-zinc-400"
                            : "hover:bg-slate-200 text-slate-500"
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="px-4 py-12 text-center">
                    <div
                        className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent ${isDark ? "text-zinc-500" : "text-slate-400"
                            }`}
                    />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm font-mono">
                        <tbody>
                            {lines.map((line, i) => (
                                <tr
                                    key={i}
                                    className={`${isDark ? "hover:bg-zinc-800/40" : "hover:bg-blue-50/50"
                                        }`}
                                >
                                    <td
                                        className={`select-none px-4 py-0 text-right align-top ${isDark ? "text-zinc-600" : "text-slate-400"
                                            }`}
                                        style={{ minWidth: "3.5rem" }}
                                    >
                                        {i + 1}
                                    </td>
                                    <td
                                        className={`px-4 py-0 whitespace-pre ${isDark ? "text-zinc-300" : "text-slate-700"
                                            }`}
                                    >
                                        {line || " "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
