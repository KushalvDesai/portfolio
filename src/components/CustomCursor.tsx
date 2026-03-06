"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <img
            src="/32px-Ethereum_logo.svg.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none fixed z-[9999]"
            style={{
                left: pos.x,
                top: pos.y,
                width: 20,
                height: 35,
                transform: "translate(-50%, -50%) rotate(-30deg)",
            }}
        />
    );
}
