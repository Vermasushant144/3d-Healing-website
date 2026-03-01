"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, PlayCircle, BookOpen, Leaf, Heart, FileText } from "lucide-react";
import { EmotionData } from "@/data/emotions";

interface EmotionRevealProps {
    emotion: EmotionData;
    onClose: () => void;
}

export default function EmotionReveal({ emotion, onClose }: EmotionRevealProps) {
    const [activeTab, setActiveTab] = useState<"shloka" | "healing" | "video">("shloka");
    const [journalEntry, setJournalEntry] = useState("");

    // Wikipedia State
    const [wikiTitle, setWikiTitle] = useState(emotion.relatedArticle.title);
    const [wikiExtract, setWikiExtract] = useState(emotion.relatedArticle.description);
    const [wikiUrl, setWikiUrl] = useState("");
    const [wikiLoading, setWikiLoading] = useState(false);

    const saveJournal = () => {
        if (!journalEntry.trim()) return;
        const history = JSON.parse(localStorage.getItem("antarmantra-journal") || "[]");
        history.push({
            date: new Date().toISOString(),
            emotion: emotion.emotionName,
            entry: journalEntry
        });
        localStorage.setItem("antarmantra-journal", JSON.stringify(history));
        setJournalEntry("");
        alert("Reflection gently saved to your local journey. Breathe.");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        const fetchWikipedia = async () => {
            if (activeTab !== "healing") return;
            setWikiLoading(true);
            try {
                // Determine search query based on emotion
                let query = emotion.emotionName;
                if (query === "Loss of Motivation") query = "Motivation";

                const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=3&exlimit=1&titles=${encodeURIComponent(query)}&explaintext=1&formatversion=2&format=json&origin=*`;
                const res = await fetch(url);
                const data = await res.json();

                if (data.query.pages && data.query.pages.length > 0 && !data.query.pages[0].missing) {
                    const page = data.query.pages[0];
                    setWikiTitle(page.title);
                    setWikiExtract(page.extract);
                    setWikiUrl(`https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`);
                } else {
                    // Fallback to static if Wikipedia misses the exact term
                    setWikiTitle(emotion.relatedArticle.title);
                    setWikiExtract(emotion.relatedArticle.description);
                    setWikiUrl("");
                }
            } catch (error) {
                console.error("Wikipedia fetch failed", error);
            } finally {
                setWikiLoading(false);
            }
        };

        fetchWikipedia();
    }, [activeTab, emotion]);

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-50 bg-[#050505] bg-opacity-95 backdrop-blur-3xl overflow-y-auto"
            data-lenis-prevent
        >
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.15)_0%,rgba(5,5,5,1)_80%)] -z-10" />

            <button
                onClick={onClose}
                className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 p-3 rounded-full bg-white/10 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/50 transition-all group"
            >
                <X className="w-8 h-8 text-white group-hover:text-[#d4af37] transition-colors" />
            </button>

            <div className="max-w-4xl mx-auto px-6 py-24 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="px-5 py-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] text-sm uppercase tracking-widest font-semibold inline-block mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        A Light for Your {emotion.emotionName}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
                        Adhyay {emotion.gitaShlok.chapter}, Shloka {emotion.gitaShlok.verse}
                    </h2>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <button
                        onClick={() => setActiveTab("shloka")}
                        className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab === 'shloka' ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <BookOpen className="w-4 h-4" /> Insight
                    </button>
                    <button
                        onClick={() => setActiveTab("healing")}
                        className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab === 'healing' ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <Leaf className="w-4 h-4" /> Action
                    </button>
                    <button
                        onClick={() => setActiveTab("video")}
                        className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab === 'video' ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
                    >
                        <PlayCircle className="w-4 h-4" /> Listen
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[50vh]">
                    {activeTab === "shloka" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] p-8 lg:p-12 backdrop-blur-md relative overflow-hidden"
                        >
                            {/* Subtle background element */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

                            <div className="text-center mb-12 relative z-10">
                                <p className="text-2xl lg:text-3xl font-medium text-[#d4af37] leading-relaxed whitespace-pre-line font-serif mb-6 text-glowing">
                                    {emotion.gitaShlok.sanskrit}
                                </p>
                                <p className="text-lg lg:text-xl italic text-gray-400 whitespace-pre-line tracking-wide">
                                    {emotion.gitaShlok.transliteration}
                                </p>
                            </div>

                            <hr className="border-white/10 my-10" />

                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-xl font-medium text-[#d4af37] mb-4 uppercase tracking-widest text-sm">Simplest Meaning</h3>
                                <p className="text-2xl text-white font-light leading-relaxed mb-12 italic">
                                    "{emotion.gitaShlok.meaningSimple}"
                                </p>

                                <h3 className="text-xl font-medium text-[#d4af37] mb-4 uppercase tracking-widest text-sm">Practical Depth</h3>
                                <p className="text-lg text-gray-300 leading-relaxed font-light">
                                    {emotion.gitaShlok.deepExplanation}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "healing" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Steps block */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md">
                                    <h3 className="text-2xl font-medium text-white mb-8 flex items-center gap-3">
                                        <Leaf className="text-[#d4af37] w-6 h-6" /> Healing Steps
                                    </h3>
                                    <ul className="space-y-6">
                                        {emotion.healingSteps.map((step, idx) => (
                                            <li key={idx} className="flex items-start gap-5">
                                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-serif text-lg border border-[#d4af37]/30">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-lg text-gray-300 leading-relaxed pt-1 font-light">{step}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Journal block */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md flex flex-col">
                                    <h3 className="text-2xl font-medium text-white mb-6 flex items-center gap-3">
                                        <Heart className="text-[#d4af37] w-6 h-6" /> Reflection
                                    </h3>
                                    <p className="text-lg font-light text-gray-300 mb-6 italic border-l-2 border-[#d4af37] pl-4">
                                        "{emotion.reflectionPrompt}"
                                    </p>
                                    <textarea
                                        value={journalEntry}
                                        onChange={(e) => setJournalEntry(e.target.value)}
                                        placeholder="Journal your thoughts here (saved privately to your device)..."
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 min-h-[160px] resize-none mb-6 flex-grow transition-all font-light"
                                    />
                                    <button
                                        onClick={saveJournal}
                                        className="w-full py-4 rounded-xl font-medium bg-[#d4af37] text-black hover:bg-white tracking-wide transition-colors"
                                    >
                                        I Commit To Healing
                                    </button>
                                </div>
                            </div>
                            {/* Related Article block from Wikipedia */}
                            <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-3xl p-8 lg:p-10 backdrop-blur-md flex items-start gap-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 pointer-events-none">
                                    <FileText className="w-40 h-40 text-[#d4af37]" />
                                </div>
                                <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex-shrink-0 flex items-center justify-center border border-[#d4af37]/30">
                                    <FileText className="w-6 h-6 text-[#d4af37]" />
                                </div>
                                <div className="relative z-10 w-full">
                                    <h4 className="text-[#d4af37] text-sm uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                                        Understanding {emotion.emotionName}
                                        {wikiLoading && <span className="animate-pulse text-white/50 lowercase"> (Fetching Wikipedia...)</span>}
                                    </h4>

                                    <h3 className="text-2xl font-medium text-white mb-3">
                                        {wikiTitle}
                                    </h3>

                                    <p className="text-lg text-gray-400 font-light leading-relaxed max-w-3xl mb-4 text-justify">
                                        {wikiExtract}
                                    </p>

                                    {wikiUrl && (
                                        <a href={wikiUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] border-b border-[#d4af37]/30 hover:border-[#d4af37] pb-1 transition-all inline-block font-medium">
                                            Read Full Article on Wikipedia &rarr;
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "video" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-md aspect-video relative overflow-hidden shadow-2xl"
                        >
                            <iframe
                                src={emotion.youtubeVideoUrl}
                                title={`${emotion.emotionName} Video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-2xl bg-black/50"
                            ></iframe>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
