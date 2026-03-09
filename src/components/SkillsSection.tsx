import { LogoCloud } from "./logo-cloud-2";

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="overflow-hidden px-6 py-24 pb-32 min-h-screen flex flex-col items-center justify-center transition-colors duration-500 bg-white dark:bg-zinc-950"
        >
            <div className="max-w-7xl w-full mx-auto">
                <p className="text-sm uppercase tracking-widest mb-3 text-slate-500 dark:text-gray-400">
                    My Skills
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 transition-colors duration-500 text-slate-900 dark:text-white">
                    Technologies I Use
                </h2>

                <div className="w-full relative py-12">
                    <LogoCloud />
                </div>
            </div>
        </section>
    );
}
