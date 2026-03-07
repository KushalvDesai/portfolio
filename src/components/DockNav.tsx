"use client";

import MacOSDock from "./mac-os-dock";

const navItems = [
    {
        id: "home",
        name: "Home",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%234F46E5'/%3E%3Cstop offset='100%25' stop-color='%237C3AED'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g1)'/%3E%3Cpath d='M32 16L14 30v18a2 2 0 002 2h10V38h12v12h10a2 2 0 002-2V30L32 16z' fill='white'/%3E%3C/svg%3E",
    },
    {
        id: "about",
        name: "About",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2306B6D4'/%3E%3Cstop offset='100%25' stop-color='%230EA5E9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g2)'/%3E%3Ccircle cx='32' cy='24' r='8' fill='white'/%3E%3Cpath d='M20 46c0-6.627 5.373-12 12-12s12 5.373 12 12' stroke='white' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
    },
    {
        id: "experience",
        name: "Experience",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g5' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%238B5CF6'/%3E%3Cstop offset='100%25' stop-color='%23A855F7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g5)'/%3E%3Ccircle cx='32' cy='32' r='14' fill='none' stroke='white' stroke-width='2.5'/%3E%3Cpath d='M32 22v10l7 7' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
    },
    {
        id: "projects",
        name: "Projects",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23F59E0B'/%3E%3Cstop offset='100%25' stop-color='%23EF4444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g3)'/%3E%3Crect x='14' y='20' width='36' height='26' rx='3' fill='none' stroke='white' stroke-width='2.5'/%3E%3Cpath d='M24 20V16a4 4 0 014-4h8a4 4 0 014 4v4' stroke='white' stroke-width='2.5' fill='none'/%3E%3Cline x1='14' y1='32' x2='50' y2='32' stroke='white' stroke-width='2'/%3E%3C/svg%3E",
    },
    {
        id: "skills",
        name: "Skills",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2310B981'/%3E%3Cstop offset='100%25' stop-color='%2334D399'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g4)'/%3E%3Cpath d='M22 18l-8 14 8 14h20l8-14-8-14H22z' fill='none' stroke='white' stroke-width='2.5' stroke-linejoin='round'/%3E%3Cpath d='M26 28l4 4 8-8' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    },

    {
        id: "achievements",
        name: "Achievements",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g6' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23F59E0B'/%3E%3Cstop offset='100%25' stop-color='%23FBBF24'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g6)'/%3E%3Cpath d='M32 14l5 10 11 2-8 7 2 11-10-5-10 5 2-11-8-7 11-2z' fill='white'/%3E%3C/svg%3E",
    },
    {
        id: "contact",
        name: "Contact Me",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g7' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23EC4899'/%3E%3Cstop offset='100%25' stop-color='%23F43F5E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g7)'/%3E%3Crect x='12' y='18' width='40' height='28' rx='4' fill='none' stroke='white' stroke-width='2.5'/%3E%3Cpath d='M12 22l20 12 20-12' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    },
];

export default function DockNav() {
    const handleAppClick = (appId: string) => {
        if (appId === "home") {
            window.location.href = "/";
            return;
        }

        // If we are already on the home page, scroll smoothly
        if (window.location.pathname === "/") {
            const el = document.getElementById(appId);
            if (el) {
                if (appId === "experience") {
                    // Scroll so the top of the section aligns with the top of the viewport
                    const y = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                } else {
                    // Scroll so the bottom of the section aligns with the bottom of the viewport
                    const sectionBottom = el.getBoundingClientRect().bottom + window.scrollY;
                    const y = sectionBottom - window.innerHeight;
                    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                }
            }
        } else {
            // Otherwise, navigate strictly to the home page hash
            window.location.href = `/#${appId}`;
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
            <MacOSDock
                apps={navItems}
                onAppClick={handleAppClick}
                openApps={[]}
            />
        </div>
    );
}
