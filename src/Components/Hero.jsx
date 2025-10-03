import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-pink-500 via-red-500 to-black">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold tracking-tight"
      >
        7 Años de Amor 💕
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-6 text-lg max-w-lg"
      >
        Un recorrido por nuestros recuerdos más bonitos.
      </motion.p>
    </div>
  );
};

export default Hero;
