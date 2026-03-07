import RepoViewer from "@/components/projects/RepoViewer";

interface PageProps {
    params: Promise<{ owner: string; repo: string }>;
}

export default async function RepoPage({ params }: PageProps) {
    const { owner, repo } = await params;

    return <RepoViewer owner={owner} repo={repo} />;
}

export async function generateMetadata({ params }: PageProps) {
    const { owner, repo } = await params;
    return {
        title: `${repo} by ${owner} — Kushal Desai`,
        description: `Explore the ${owner}/${repo} repository`,
    };
}
