import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const specialMoments = [
  {
    title: "Primer viaje juntos ✈️",
    text: "Recorriendo nuevos lugares y creando recuerdos inolvidables.",
    images: ["https://picsum.photos/400/300?random=101"],
  },
  {
    title: "Primer aniversario 🎉",
    text: "Celebrando nuestro primer año de amor y aventuras.",
    images: ["https://picsum.photos/400/300?random=102"],
  },
  {
    title: "Reto superado 💪",
    text: "Siempre apoyándonos mutuamente en todo momento.",
    images: ["https://picsum.photos/400/300?random=103"],
  },
  {
    title: "Nuestro hogar 🏡",
    text: "Construyendo un espacio lleno de amor y felicidad.",
    images: ["https://picsum.photos/400/300?random=104"],
  },
  {
    title: "Vacaciones soñadas 🌴",
    text: "Escapadas románticas para crear recuerdos eternos.",
    images: ["https://picsum.photos/400/300?random=105"],
  },
  {
    title: "Vacaciones soñadas 🌴",
    text: "Escapadas románticas para crear recuerdos eternos.",
    images: "https://picsum.photos/400/300?random=106",
  },
];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const createHeart = () => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const duration = Math.random() * 8 + 5;
      setHearts((prev) => [...prev, { id: Date.now(), size, left, duration }]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, duration * 1000);
    };
    const interval = setInterval(createHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400"
          style={{
            fontSize: heart.size,
            left: `${heart.left}%`,
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, 1, 0] }}
          transition={{ duration: heart.duration, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const SpecialMoments = () => {
  const [selectedMoment, setSelectedMoment] = useState(null);

  console.log({selectedMoment})

  return (
    <section className="relative py-32 bg-gradient-to-b from-pink-50 via-pink-100 to-white overflow-hidden">
      {/* Fondo animado */}
      <FloatingHearts />
      <h2 className="text-3xl text-center mb-6 text-pink-500 font-extrabold italic">Momentos Especiales</h2>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialMoments.map((moment, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            onClick={() => setSelectedMoment(moment)}
          >
            {/* Imagen */}
            <img
              src={moment.images}
              alt={moment.title}
              className="w-full h-64 object-cover rounded-xl transform transition-transform duration-500 hover:scale-105"
            />

            {/* Overlay con texto */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center">
              <h3 className="text-pink-500 text-lg font-bold mb-2">
                {moment.title}
              </h3>
              <p className="text-white/90 text-sm">{moment.text}</p>
            </div>
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
