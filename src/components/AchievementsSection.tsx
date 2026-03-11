import { Awards } from "./award";

export default function AchievementsSection() {
    return (
        <section
            id="achievements"
            className="overflow-hidden px-6 py-24 pb-32 min-h-screen flex flex-col items-center justify-center transition-colors duration-500 bg-white dark:bg-zinc-950"
        >
            <div className="max-w-7xl w-full mx-auto">
                <p className="text-sm uppercase tracking-widest mb-3 text-slate-500 dark:text-gray-400">
                    My Milestones
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 transition-colors duration-500 text-slate-900 dark:text-white">
                    Achievements and Certificates
                </h2>

                <div className="w-full relative py-12 flex flex-col gap-12 lg:grid lg:grid-cols-3">
                    <Awards
                        title="Winner"
                        subtitle="Gen AI Hackathon"
                        recipient="WIBD - Vadodara"
                        date="Feb 2026"
                        variant="award"
                    />
                    <Awards
                        title="3rd Place"
                        subtitle="Innotech 2025 - research category"
                        recipient="Charusat University"
                        date="Sept 2025"
                        variant="award"
                        level="bronze"
                    />
                    <Awards
                        title="Finalist Top 50"
                        subtitle="Odoo Hackathon'25"
                        recipient="Odoo"
                        date="Aug 2025"
                        variant="award"
                        level="none"
                    />
                    <Awards
                        title="2nd Place"
                        subtitle="Sankalp-101 Hackathon"
                        recipient="TrishulX Community."
                        date="Jun 2025"
                        variant="award"
                        level="silver"
                    />
                    <Awards
                        title="4th Place"
                        subtitle="Blockchain Hackathon — Hedera"
                        recipient="Information Data Systems"
                        date="Mar 2025"
                        variant="award"
                        level="bronze"
                    />
                </div>
            </div>
        </section>
    );
}
