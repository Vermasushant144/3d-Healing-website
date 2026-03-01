"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

const FRAME_COUNT = 285;
const SUBFOLDER_PATH = "/ezgif-4e0333cf772224e1-jpg";
const FRAME_PREFIX = "ezgif-frame-";

const getFramePath = (index: number) => {
    const paddedIndex = index.toString().padStart(3, "0");
    return `${SUBFOLDER_PATH}/${FRAME_PREFIX}${paddedIndex}.jpg`;
};

export default function CanvasScrollEngine() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        // Progressive Loading strategy
        const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT + 1);
        let loadedCount = 0;

        const loadImage = (index: number) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = getFramePath(index);
                img.onload = () => {
                    loadedImages[index] = img;
                    loadedCount++;
                    setLoadProgress((loadedCount / FRAME_COUNT) * 100);
                    resolve();
                };
                img.onerror = () => resolve();
            });
        };

        const loadSequence = async () => {
            await loadImage(1);
            setImages([...loadedImages]);

            for (let i = 4; i <= FRAME_COUNT; i += 4) {
                await loadImage(i);
            }
            setImages([...loadedImages]);

            const remaining = [];
            for (let i = 2; i <= FRAME_COUNT; i++) {
                if (!loadedImages[i]) remaining.push(i);
            }

            for (let i = 0; i < remaining.length; i += 5) {
                const chunk = remaining.slice(i, i + 5).map(loadImage);
                await Promise.all(chunk);
                setImages([...loadedImages]);
            }
        };

        loadSequence();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const idx = Math.min(FRAME_COUNT, Math.max(1, Math.round(frameIndex.get())));
            let imgToDraw = images[idx];
            if (!imgToDraw) {
                for (let i = idx; i >= 1; i--) {
                    if (images[i]) {
                        imgToDraw = images[i];
                        break;
                    }
                }
            }

            if (imgToDraw) {
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = imgToDraw.width / imgToDraw.height;
                let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

                // For Mobile (Portrait): Use a "contain" style to prevent left/right cutting
                // For Desktop (Landscape): Use "cover" style for immersive experience
                if (canvas.height > canvas.width) {
                    // Mobile/Portrait: Fit to Width (Show full horizontal view)
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetY = (canvas.height - drawHeight) / 2;
                    offsetX = 0;
                } else {
                    // Desktop/Landscape: Fit to Height (Cover full screen)
                    if (canvasRatio > imgRatio) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgRatio;
                        offsetY = (canvas.height - drawHeight) / 2;
                        offsetX = 0;
                    } else {
                        drawHeight = canvas.height;
                        drawWidth = canvas.height * imgRatio;
                        offsetX = (canvas.width - drawWidth) / 2;
                        offsetY = 0;
                    }
                }


                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 0.8; // dim slightly
                ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
                ctx.globalAlpha = 1.0;

                // Add dark spiritual vignette overlay
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, canvas.width * 0.1,
                    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
                );
                gradient.addColorStop(0, "rgba(5, 5, 5, 0.4)");
                gradient.addColorStop(1, "rgba(5, 5, 5, 0.98)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        render();


        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, frameIndex]);

    return (
        <>
            {loadProgress < 100 && (
                <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] bg-black">
                    <div
                        className="h-full bg-[#d4af37] transition-all duration-300 shadow-[0_0_10px_#d4af37]"
                        style={{ width: `${loadProgress}%` }}
                    />
                </div>
            )}
            <div className="fixed inset-0 w-full h-screen overflow-hidden z-[-1] pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full block" />

                <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>
        </>
    );
}
