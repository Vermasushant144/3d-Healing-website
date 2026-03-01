"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeFormProps {
    onSubmit: (name: string, feeling: string) => void;
}

export default function WelcomeForm({ onSubmit }: WelcomeFormProps) {
    const [name, setName] = useState("");
    const [feeling, setFeeling] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // 1 sec delay as requested
        const t = setTimeout(() => setMounted(true), 1000);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && feeling.trim()) {
            onSubmit(name.trim(), feeling.trim());
        }
    };

    return (
        <AnimatePresence>
            {mounted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                >
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_50%)]" />

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full shadow-2xl relative"
                    >
                        <h2 className="text-4xl text-center text-[#d4af37] mb-2 font-semibold tracking-wide">Enter the Sanctorum</h2>
                        <p className="text-gray-400 text-center font-light mb-10 text-lg">Before we begin, who are you and what do you seek today?</p>

                        <div className="mb-6">
                            <label className="text-gray-300 mb-2 block font-medium">What is your name?</label>
                            <input
                                autoFocus
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all font-light text-lg"
                                placeholder="e.g. Arjun"
                            />
                        </div>

                        <div className="mb-10">
                            <label className="text-gray-300 mb-2 block font-medium">How are you feeling right now?</label>
                            <input
                                value={feeling}
                                onChange={e => setFeeling(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all font-light text-lg"
                                placeholder="e.g. sad, lonely, anxious, confused..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl font-medium bg-[#d4af37] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all text-lg tracking-wide"
                        >
                            Begin Your Journey
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
