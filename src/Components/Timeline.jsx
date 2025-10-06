import { motion, useMotionValue, animate } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import { memories } from '../Data/Memories'



const Timeline = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [totalLength, setTotalLength] = useState(0);

  const dashOffset = useMotionValue(0);

  // Detectar móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Medir contenedor
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generar puntos y totalLength
  useEffect(() => {
    if (!pathRef.current || size.width === 0) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    setTotalLength(length);

    const pts = memories.map((_, idx) => {
      const distance = (length / (memories.length - 1)) * idx;
      const { x, y } = path.getPointAtLength(distance);
      return { x, y };
    });
    setPoints(pts);

    dashOffset.set(length); // línea oculta al inicio
  }, [size, isMobile]);

  const getPathD = () => {
    if (size.width === 0) return "";
    const w = size.width;
    const h = size.height;
    if (isMobile) {
      return `M ${w * 0.5} ${h * 0.05} Q ${w * 0.1} ${h * 0.25}, ${w * 0.5} ${h * 0.5
        } T ${w * 0.5} ${h * 0.95}`;
    } else {
      return `M ${w * 0.05} ${h * 0.5} Q ${w * 0.25} ${h * 0.1}, ${w * 0.5} ${h * 0.5
        } T ${w * 0.75} ${h * 0.5} T ${w * 0.95} ${h * 0.5}`;
    }
  };

  // Animación secuencial de línea y puntos
  const handleClick = (idx) => {
    if (!totalLength) return;

    const lengthPerPoint = totalLength / (memories.length - 1);
    const animateStep = (i) => {
      if (i > idx) return;

      const targetOffset = totalLength - i * lengthPerPoint;
      animate(dashOffset, targetOffset, {
        duration: 0.4,
        ease: "easeInOut",
        onComplete: () => {
          setCurrentIndex(i);
          animateStep(i + 1); // llamar siguiente punto
        },
      });
    };

    animateStep(0); // iniciar animación desde el primer punto
    setSelectedMemory(memories[idx]);
  };
  const title = "Haz clicken los puntos";

  return (
    <section id="timeline" className="relative py-32 bg-gradient-to-t from-pink-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-pink-500 text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl"
          initial="hidden"
          animate="visible"
        >
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
        </motion.h1>

        <motion.p
          className="mt-6 text-pink-600 text-lg md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Para ver nuestro recorrido
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[400px] mx-auto"
      >
        {/* Línea */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <motion.path
            ref={pathRef}
            d={getPathD()}
            fill="transparent"
            stroke="#ec4899"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>

        {/* Puntos */}
        {points.map((pt, idx) => (
          <motion.div
            key={idx}
            style={{ position: "absolute", left: pt.x - 16, top: pt.y - 16 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: idx <= currentIndex ? 1.3 : 1,
              opacity: idx <= currentIndex ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={() => handleClick(idx)}
              className="w-8 h-8 bg-pink-500 rounded-full border-4 border-white shadow-lg hover:bg-pink-600 transition-colors"
            />
            <motion.span
              className={`absolute font-bold text-pink-700 ${isMobile
                ? "left-10 top-1/2 -translate-y-1/2"
                : "left-1/2 -translate-x-1/2 -mt-10"
                }`}
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: idx <= currentIndex ? 0 : -10,
                opacity: idx <= currentIndex ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {memories[idx].year}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedMemory}
        onClose={() => setSelectedMemory(null)}
        memory={selectedMemory}
      />
    </section>
  );
};

export default Timeline;
