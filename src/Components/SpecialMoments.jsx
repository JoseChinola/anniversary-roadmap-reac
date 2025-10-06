import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { specialMoments } from "../Data/specialMoments";
import Confetti from "../utils/confetti";

// ❤️ corazones flotantes románticos
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400"
          style={{
            fontSize: `${Math.random() * 18 + 12}px`,
            left: `${20 + i * 20}%`,
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const SpecialMoments = () => {
  const [selectedMoment, setSelectedMoment] = useState(null);

  const title = "Momentos Especiales";
  return (
    <section className="relative py-28 bg-gradient-to-b from-pink-50 via-pink-100 to-white overflow-hidden">
      <Confetti />

      <div className="max-w-5xl mx-auto text-center mb-8">
        <motion.h1
          className="text-pink-500 text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl"
          initial="hidden"
          animate="visible"
        >
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
            ✨
          </motion.span>

          {title.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block mr-2">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: -20, rotate: -10 },
                    visible: { opacity: 1, y: 0, rotate: 0 },
                  }}
                  transition={{
                    delay: (wordIdx * word.length + charIdx) * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
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
            ✨
          </motion.span>
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {specialMoments.map((moment, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            onClick={() => setSelectedMoment(moment)}
          >
            {/* Imagen */}
            <motion.img
              src={
                Array.isArray(moment.images) ? moment.images[0] : moment.images
              }
              alt={moment.title}
              className="w-full h-64 object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Desktop (hover) */}
            <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex-col justify-center items-center p-4 text-center">
              <h3 className="text-pink-300 text-xl font-bold mb-2 drop-shadow-lg">
                {moment.title}
              </h3>
              <FloatingHearts />
              <p className="text-white/90 text-sm">{moment.text}</p>
              <Confetti />
            </div>

            {/* Overlay Móvil (scroll + corazones) */}
            <motion.div
              className="md:hidden absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
            >
              {/* corazones románticos */}
              <FloatingHearts />

              <motion.h3
                className="text-pink-300 text-xl font-bold mb-2 drop-shadow-lg relative z-10"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {moment.title}
              </motion.h3>
              <motion.p
                className="text-white/90 text-sm relative z-10"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {moment.text}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedMoment}
        onClose={() => setSelectedMoment(null)}
        memory={selectedMoment}
      />
    </section>
  );
};

export default SpecialMoments;
