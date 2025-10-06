import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Confetti from "../utils/confetti";

const FinalMessage = () => {
  const [showText, setShowText] = useState("");
  const fullText =
    "Hoy celebramos 7 años de amor, y esto es solo el comienzo 🥂";
  const controls = useAnimation();
  const indexRef = useRef(0);

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(fullText.slice(0, indexRef.current + 1));
      indexRef.current += 1;
      if (indexRef.current >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Bounce effect al final
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.6 } });
    }, 1500);
    return () => clearInterval(bounceInterval);
  }, [controls]);

  return (
    <section className="relative h-screen mx-auto flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white overflow-hidden">
      {/* Fondo y efectos */}
      <Confetti />

      {/* Texto central */}
      <motion.h1
        animate={controls}
        className="text-center max-w-5xl text-4xl md:text-6xl font-extrabold text-pink-600 drop-shadow-lg px-6"
      >
        {showText}
      </motion.h1>
    </section>
  );
};

export default FinalMessage;
