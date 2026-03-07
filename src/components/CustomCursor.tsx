"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <img
            src={isDark ? "/32px-Ethereum_logo.svg.png" : "/32px-Ethereum_logo.svg_dark.png"}
            alt=""
            aria-hidden="true"
            className="pointer-events-none fixed z-[9999]"
            style={{
                left: pos.x,
                top: pos.y,
                width: isDark ? 30 : 15,
                height: isDark ? 45 : 35,
                transform: "translate(-50%, -50%) rotate(-30deg)",
            }}
        />
    );
}
