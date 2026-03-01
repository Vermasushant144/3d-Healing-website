"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import CanvasScrollEngine from "@/components/CanvasScrollEngine";
import EmotionReveal from "@/components/EmotionReveal";
import WelcomeForm from "@/components/WelcomeForm";
import { EmotionData, findEmotionByKeyword } from "@/data/emotions";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // State management
  const [userName, setUserName] = useState("");
  const [userFeeling, setUserFeeling] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionData | null>(null);
  const [autoRevealed, setAutoRevealed] = useState(false);

  // Intro text opacities 
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]);
  const subTitleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const step5Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95], [0, 1, 0]);

  // Persistent scroll hint opacity - visible from 10% to 90%
  const scrollHintOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);



  const handleFormSubmit = (name: string, feeling: string) => {
    setUserName(name);
    setUserFeeling(feeling);
    setShowForm(false);
    setFormSubmitted(true);
  };

  // Trigger Shloka popup when user reaches the end of the page (95% scroll)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (formSubmitted && !autoRevealed && latest > 0.95) {
        const match = findEmotionByKeyword(userFeeling);
        setSelectedEmotion(match);
        setAutoRevealed(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, formSubmitted, autoRevealed, userFeeling]);

  return (
    <>
      <CanvasScrollEngine />

      <AnimatePresence>
        {showForm && <WelcomeForm onSubmit={handleFormSubmit} />}
      </AnimatePresence>

      <main ref={containerRef} className="relative w-full h-[800vh]">
        {/* Intro Step 1 */}
        {formSubmitted && (
          <motion.div
            style={{ opacity: titleOpacity }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-light tracking-widest text-[#d4af37] text-glowing mb-4 text-center font-serif italic"
            >
              Welcome, {userName}.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl font-light tracking-wide text-gray-300 text-center mt-4"
            >
              You said you are feeling <span className="font-semibold text-white/90">"{userFeeling}"</span>.
            </motion.p>
            {!autoRevealed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2 }}
                className="mt-8 text-sm font-light text-[#d4af37] animate-bounce"
              >
                Scroll to the end of the journey to find your answer...
              </motion.p>
            )}
          </motion.div>
        )}
        {/* Intro Step 2 */}
        <motion.div
          style={{ opacity: subTitleOpacity }}
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wide text-glowing text-center leading-relaxed font-serif text-[#d4af37]">
            Every emotion you feel <br /> was answered 5,000 years ago.
          </h2>
          <p className="mt-8 text-lg font-light text-gray-400 italic">
            Keep scrolling...
          </p>
        </motion.div>

        {/* Intro Step 3 */}
        <motion.div
          style={{ opacity: step3Opacity }}
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-widest text-[#d4af37] text-glowing text-center leading-relaxed font-serif">
            Take a deep breath. <br />
            <span className="text-white/80 italic text-2xl font-light">Let go of what you cannot control.</span>
          </h2>
        </motion.div>

        {/* Intro Step 4 */}
        <motion.div
          style={{ opacity: step4Opacity }}
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-300 text-center leading-relaxed max-w-4xl px-8">
            "The soul is neither born, nor does it ever die. <br />
            It is unborn, eternal, ever-existing and undying."
            <span className="block mt-4 text-[#d4af37] text-lg uppercase tracking-widest">— Bhagavad Gita 2.20</span>
          </h2>
        </motion.div>

        {/* Intro Step 5 */}
        <motion.div
          style={{ opacity: step5Opacity }}
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-4"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-[#d4af37] text-glowing text-center italic">
            Your healing starts here.
          </h2>
          <p className="mt-6 text-xl font-light text-white/50 lowercase tracking-[0.3em]">
            Almost there...
          </p>
        </motion.div>

        {/* Persistent Scroll Hint */}
        {formSubmitted && !autoRevealed && (
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="fixed bottom-10 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-30"
          >
            <p className="text-[#d4af37]/60 text-xs uppercase tracking-[0.5em] font-light mb-2 animate-pulse">
              Keep scrolling
            </p>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37]/40 to-transparent" />
          </motion.div>
        )}
      </main>

      {/* Emotion Reveal Overlay */}
      <AnimatePresence>
        {selectedEmotion && (
          <EmotionReveal
            emotion={selectedEmotion}
            onClose={() => setSelectedEmotion(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
