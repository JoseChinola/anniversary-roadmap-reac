import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// Emojis flotantes
const FloatingHearts = ({ count = 15 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        size: Math.random() * 20 + 15,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        rotate: Math.random() * 360,
      };
      setHearts((prev) => [...prev, newHeart]);
      // Limitar cantidad para que no se acumulen
      if (hearts.length > 50) setHearts((prev) => prev.slice(-30));
    }, 400);
    return () => clearInterval(interval);
  }, [hearts]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400"
          style={{
            fontSize: heart.size,
            left: `${heart.left}%`,
          }}
          initial={{ y: "100%", opacity: 0, rotate: 0 }}
          animate={{ y: "-20%", opacity: [0, 1, 0], rotate: [0, heart.rotate, 0] }}
          transition={{ duration: heart.duration, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

// Confeti romántico (emojis)
const FallingConfetti = ({ count = 20 }) => {
  const [confetti, setConfetti] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const newConf = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        emoji: ["💌", "🌹", "🥂", "💖"][Math.floor(Math.random() * 4)],
        size: Math.random() * 20 + 15,
      };
      setConfetti((prev) => [...prev, newConf]);
      if (confetti.length > 50) setConfetti((prev) => prev.slice(-30));
    }, 300);
    return () => clearInterval(interval);
  }, [confetti]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{ fontSize: c.size, left: `${c.left}%` }}
          initial={{ y: "-10%", opacity: 0, rotate: 0 }}
          animate={{ y: "110%", opacity: [0, 1, 0], rotate: [0, 360, 0] }}
          transition={{ duration: c.duration, ease: "easeInOut" }}
        >
          {c.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const FinalMessage = () => {
  const [showText, setShowText] = useState("");
  const fullText = "Hoy celebramos 7 años de amor, y esto es solo el comienzo 🥂";
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
      <FloatingHearts />
      <FallingConfetti />

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
