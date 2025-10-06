import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
          animate={{
            y: "-20%",
            opacity: [0, 1, 0],
            rotate: [0, heart.rotate, 0],
          }}
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

const Confetti = () => {
  return (
    <div>
      <FloatingHearts />
      <FallingConfetti />
    </div>
  );
};

export default Confetti;
