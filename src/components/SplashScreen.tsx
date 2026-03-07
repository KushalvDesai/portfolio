"use client";

import { useState, useEffect } from "react";

export default function SplashScreen({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSplash, setShowSplash] = useState(() => {
        if (typeof window !== "undefined") {
            return !sessionStorage.getItem("hasSeenSplash");
        }
        return true;
    });
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!showSplash) return;

        // Always start at the top on page load/refresh
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);

        // Start fade-out after 3.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
            sessionStorage.setItem("hasSeenSplash", "true");
        }, 3500);
        // Remove splash screen after fade animation completes
        const removeTimer = setTimeout(() => setShowSplash(false), 4300);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [showSplash]);

    return (
        <>
            {showSplash && (
                <div
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"
                        }`}
                >
                    {/* Local MP4 - Turning Red cooking scene */}
                    <video
                        src="/Turning_Red_dad_cooking_food_scene.mp4"
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div
                className={`transition-opacity duration-500 ${showSplash && !fadeOut ? "opacity-0" : "opacity-100"
                    }`}
            >
                {children}
            </div>
        </>
    );
}
