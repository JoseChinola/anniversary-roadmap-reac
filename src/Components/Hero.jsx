import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const title = "8 Años Juntos";
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-600 via-rose-500 to-rose-900"
    >
      {/* Decorative floating hearts (purely visual, pointer-events-none) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -60 }}
            animate={{
              opacity: [0, 0.9, 0.6, 0],
              y: [-60, 80 + (i % 3) * 30, 180 + (i % 4) * 20, 300],
            }}
            transition={{
              duration: 10 + (i % 4) * 2,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{ left: `${(i * 9) % 100}%` }}
            className="absolute text-2xl md:text-3xl text-pink-100/85"
          >
            💖
          </motion.span>
        ))}
      </div>
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-pink-200 text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl"
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((char, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: -20, rotate: -10 },
                  visible: { opacity: 1, y: 0, rotate: 0 },
                }}
                transition={{
                  delay: idx * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              className="inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: title.length * 0.05,
                type: "spring",
                stiffness: 300,
              }}
            >
              💕
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-6 text-pink-300 text-lg md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Un viaje visual por nuestros 8 años: fotos, recuerdos y momentos que
            marcaron nuestra historia.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("timeline")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="px-6 py-3 rounded-full bg-white text-rose-600 font-semibold shadow-lg hover:scale-105 transform transition"
              aria-label="Descubre nuestro viaje"
            >
              Descubre nuestro viaje
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="px-4 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
              aria-label="Ir a la galería"
            >
              Ver galería
            </button>
          </motion.div>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-4xl h-64 md:h-96">
            <motion.img
              src="fotos/Hero/hero1.jpg"
              alt="Collage 1"
              className="absolute left-0 top-6 w-40 md:w-56 rounded-xl shadow-2xl object-cover"
              whileHover={{ scale: 1.03, rotate: -3 }}
              transition={{ type: "spring", stiffness: 120 }}
              style={{ width: "260px", height: "170px" }}
            />

            <motion.img
              src="fotos/Hero/hero2.jpg"
              alt="Collage 2"
              className="absolute left-1/3 top-0 w-56 md:w-72 rounded-2xl shadow-2xl object-cover border-4 border-white/10"
              whileHover={{ scale: 1.04, rotate: 2 }}
              transition={{ type: "spring", stiffness: 120 }}
            />

            <motion.img
              src="fotos/Hero/hero3.jpg"
              alt="Collage 3"
              className="absolute right-0 top-12 w-40 md:w-56 rounded-xl shadow-2xl object-cover"
              whileHover={{ scale: 1.03, rotate: -2 }}
              transition={{ type: "spring", stiffness: 120 }}
              style={{ width: "290px", height: "180px" }}
            />
          </div>
        </div>
      </div>

      {/* Subtle bottom curve SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24 md:h-32"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.06)"
            d="M0,32 C360,120 1080,0 1440,64 L1440 120 L0 120 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
