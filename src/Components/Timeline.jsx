import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Modal from "./Modal";

const memories = [
  {
    year: "2018",
    text: "El inicio de nuestra historia 💖",
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
  },
  {
    year: "2019",
    text: "Nuestro primer viaje juntos ✈️",
    images: [
      "https://picsum.photos/600/400?random=4",
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
    ],
  },
  {
    year: "2020",
    text: "Momentos difíciles, pero unidos siempre 💪",
    images: [
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=9",
    ],
  },
  {
    year: "2021",
    text: "Nuevas aventuras y sueños 🌎",
    images: [
      "https://picsum.photos/600/400?random=10",
      "https://picsum.photos/600/400?random=11",
      "https://picsum.photos/600/400?random=12",
    ],
  },
  {
    year: "2022",
    text: "Creciendo juntos día a día 🌱",
    images: [
      "https://picsum.photos/600/400?random=13",
      "https://picsum.photos/600/400?random=14",
      "https://picsum.photos/600/400?random=15",
    ],
  },
  {
    year: "2023",
    text: "Un amor más fuerte que nunca ❤️",
    images: [
      "https://picsum.photos/600/400?random=16",
      "https://picsum.photos/600/400?random=17",
      "https://picsum.photos/600/400?random=18",
    ],
  },
  {
    year: "2024",
    text: "Celebrando 7 años de amor 🥂",
    images: [
      "https://picsum.photos/600/400?random=19",
      "https://picsum.photos/600/400?random=20",
      "https://picsum.photos/600/400?random=21",
    ],
  },
];

const Timeline = () => {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // cuando entra y cuando sale
  });

  // Parallax: desplazamiento vertical basado en scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 md:px-16 bg-black relative"
    >
      <h2 className="text-4xl font-bold text-center mb-32">Nuestro Viaje</h2>
      <div className="space-y-32">
        {memories.map((memory, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 cursor-pointer"
            onClick={() => setSelected(memory)}
          >
            <motion.img
              src={memory.images[0]}
              alt={memory.text}
              style={{ y: idx % 2 === 0 ? y1 : y2 }} // efecto parallax alternado
              className="rounded-xl shadow-lg w-full md:w-1/2 hover:scale-105 transition-transform duration-500"
            />
            <motion.div
              style={{ y: idx % 2 === 0 ? y2 : y1 }}
              className="md:w-1/2 text-center md:text-left"
            >
              <h3 className="text-2xl font-semibold mb-4">{memory.year}</h3>
              <p className="text-lg opacity-80">{memory.text}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        memory={selected || {}}
      />
    </section>
  );
};

export default Timeline;
