"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useTheme } from "@/components/ThemeProvider";

interface ReadmeViewerProps {
    content: string;
}

export default function ReadmeViewer({ content }: ReadmeViewerProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!content) {
        return (
            <div
                className={`rounded-xl border p-8 text-center text-sm ${isDark
                    ? "border-zinc-800 bg-zinc-900/50 text-zinc-500"
                    : "border-slate-200 bg-white text-slate-400"
                    }`}
            >
                No README found for this repository.
            </div>
        );
    }

    return (
        <div
            className={`rounded-xl border overflow-hidden ${isDark ? "border-zinc-800 bg-zinc-900/50" : "border-slate-200 bg-white"
                }`}
        >
            {/* Header */}
            <div
                className={`flex items-center gap-2 px-5 py-3 border-b text-sm font-medium ${isDark
                    ? "border-zinc-800 bg-zinc-900 text-zinc-300"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
            >
                <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
                README.md
            </div>

            {/* Markdown body */}
            <div className="px-6 py-5">
                <div
                    className={`prose max-w-none ${isDark ? "prose-invert" : ""
                        } prose-headings:font-semibold prose-headings:tracking-tight
          prose-h1:text-2xl prose-h1:border-b prose-h1:pb-2 ${isDark
                            ? "prose-h1:border-zinc-700"
                            : "prose-h1:border-slate-200"
                        }
          prose-h2:text-xl prose-h2:border-b prose-h2:pb-1.5 ${isDark
                            ? "prose-h2:border-zinc-800"
                            : "prose-h2:border-slate-200"
                        }
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded ${isDark
                            ? "prose-code:bg-zinc-800 prose-code:text-zinc-300"
                            : "prose-code:bg-slate-100 prose-code:text-slate-700"
                        }
          prose-pre:rounded-lg prose-pre:overflow-x-auto ${isDark
                            ? "prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
                            : "prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200"
                        }
          prose-img:m-0 prose-img:inline-block prose-img:rounded-lg prose-img:max-w-full
          prose-blockquote:border-l-4 ${isDark
                            ? "prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400"
                            : "prose-blockquote:border-slate-300 prose-blockquote:text-slate-500"
                        }
          prose-table:border-collapse
          prose-th:border prose-th:px-3 prose-th:py-2 ${isDark
                            ? "prose-th:border-zinc-700 prose-th:bg-zinc-800/50"
                            : "prose-th:border-slate-200 prose-th:bg-slate-50"
                        }
          prose-td:border prose-td:px-3 prose-td:py-2 ${isDark
                            ? "prose-td:border-zinc-800"
                            : "prose-td:border-slate-200"
                        }
          prose-li:marker:text-zinc-500
          `}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
