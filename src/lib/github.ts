const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
    };
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

const fetchOptions: RequestInit = {
    headers: getHeaders(),
    next: { revalidate: 3600 },
};

// ── Types ──

export interface RepoMeta {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    default_branch: string;
    topics: string[];
    owner: { login: string; avatar_url: string };
}

export interface ContentItem {
    name: string;
    path: string;
    type: "file" | "dir";
    size: number;
    download_url: string | null;
    sha: string;
}

export interface ReadmeData {
    content: string; // base64
    encoding: string;
    name: string;
}

export type Languages = Record<string, number>;

// ── Fetchers ──

function decodeBase64(str: string): string {
    if (typeof window === "undefined") {
        return Buffer.from(str, "base64").toString("utf-8");
    }
    // Handle multi-byte UTF-8 characters properly in the browser
    return decodeURIComponent(
        atob(str)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
}

export async function fetchRepo(repo: string): Promise<RepoMeta> {
    const res = await fetch(`${GITHUB_API}/repos/${repo}`, fetchOptions);
    if (!res.ok) throw new Error(`Failed to fetch repo: ${res.status}`);
    return res.json();
}

export async function fetchContents(
    repo: string,
    path = ""
): Promise<ContentItem[]> {
    const url = path
        ? `${GITHUB_API}/repos/${repo}/contents/${path}`
        : `${GITHUB_API}/repos/${repo}/contents`;
    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error(`Failed to fetch contents: ${res.status}`);
    const data = await res.json();
    // Ensure we always return an array (single file returns an object)
    return Array.isArray(data) ? data : [data];
}

export async function fetchReadme(repo: string): Promise<string> {
    const res = await fetch(`${GITHUB_API}/repos/${repo}/readme`, fetchOptions);
    if (!res.ok) return "";
    const data: ReadmeData = await res.json();
    // Decode base64 content
    return decodeBase64(data.content);
}

export async function fetchLanguages(repo: string): Promise<Languages> {
    const res = await fetch(`${GITHUB_API}/repos/${repo}/languages`, fetchOptions);
    if (!res.ok) return {};
    return res.json();
}

export async function fetchFileContent(
    repo: string,
    path: string
): Promise<string> {
    const res = await fetch(
        `${GITHUB_API}/repos/${repo}/contents/${path}`,
        fetchOptions
    );
    if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
    const data = await res.json();
    if (data.encoding === "base64" && data.content) {
        return decodeBase64(data.content);
    }
    // For files too large for the contents API, try download_url
    if (data.download_url) {
        const raw = await fetch(data.download_url);
        return raw.text();
    }
    return "// Unable to load file content";
}

// ── Language Colors (top ~40) ──

export const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Scala: "#c22d40",
    Shell: "#89e051",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    Lua: "#000080",
    R: "#198CE7",
    Haskell: "#5e5086",
    Elixir: "#6e4a7e",
    Clojure: "#db5855",
    Solidity: "#AA6746",
    Dockerfile: "#384d54",
    Makefile: "#427819",
    Jupyter: "#DA5B0B",
    MDX: "#fcb32c",
    Markdown: "#083fa1",
    JSON: "#292929",
    YAML: "#cb171e",
    TOML: "#9c4221",
    Zig: "#ec915c",
    Nix: "#7e7eff",
    Astro: "#ff5a03",
};
