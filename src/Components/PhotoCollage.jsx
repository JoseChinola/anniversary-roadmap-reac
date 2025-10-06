import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const photos = [
    "https://picsum.photos/800/600?random=201",
    "https://picsum.photos/800/600?random=202",
    "https://picsum.photos/800/600?random=203",
    "https://picsum.photos/800/600?random=204",
    "https://picsum.photos/800/600?random=205",
    "https://picsum.photos/800/600?random=206",
    "https://picsum.photos/800/600?random=207",
    "https://picsum.photos/800/600?random=208",
];

const rotations = ["rotate-2", "-rotate-3", "rotate-6", "-rotate-2", "rotate-1", "-rotate-6"];

// Partículas románticas (corazones y brillos)
const ParticlesBackground = () => {
    const [particles, setParticles] = useState([]);
    const scrollY = useMotionValue(0);
    const yTransform = useTransform(scrollY, [0, 1000], [0, -150]); // Parallax

    useEffect(() => {
        const handleScroll = () => scrollY.set(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollY]);

    useEffect(() => {
        const createParticle = () => {
            const size = Math.random() * 15 + 8;
            const left = Math.random() * 100;
            const duration = Math.random() * 8 + 6;
            const color = Math.random() > 0.5 ? "pink" : "white";
            setParticles((prev) => [...prev, { id: Date.now(), size, left, duration, color }]);
            setTimeout(() => setParticles((prev) => prev.slice(1)), duration * 1000);
        };
        const interval = setInterval(createParticle, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: yTransform }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute text-${p.color}-400`}
                    style={{ fontSize: p.size, left: `${p.left}%` }}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "-20%", opacity: [0, 1, 0] }}
                    transition={{ duration: p.duration, ease: "easeInOut" }}
                >
                    {Math.random() > 0.5 ? "❤️" : "✨"}
                </motion.div>
            ))}
        </motion.div>
    );
};




const PhotoCollage = () => {
    const [selected, setSelected] = useState(null);

    const handleNext = () => setSelected((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    const handlePrev = () => setSelected((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

    const title = " Recuerdos en Fotos"

    return (
        <section id="gallery" className="relative py-24 bg-gradient-to-b from-white via-pink-50 to-pink-100 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-6">
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
                        📸
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
                </motion.h1>
            </div>

            {/* Partículas románticas */}
            <ParticlesBackground />

            {/* Collage con levitación y rotación */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {photos.map((src, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer ${rotations[idx % rotations.length]}`}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: idx * 0.1 }}
                        whileHover={{ scale: 1.1, rotate: 0 }}
                        onClick={() => setSelected(idx)}
                    >
                        <motion.img
                            src={src}
                            alt={`memory-${idx}`}
                            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
                            animate={{
                                y: ["0%", "-3%", "0%"],
                                rotate: ["0deg", "2deg", "-2deg", "0deg"],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: idx * 0.2,
                            }}
                        />
                        <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-600 italic">
                            ♥ Recuerdo {idx + 1}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ParticlesBackground />

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-500/30"
                            animate={{ opacity: [0.6, 0.9, 0.6] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        />

                        <motion.img
                            key={selected}
                            src={photos[selected]}
                            alt="selected"
                            className="relative max-w-3xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white z-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Navegación */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-6 text-white text-4xl font-bold hover:scale-125 transition z-20"
                        >
                            ‹
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-6 text-white text-4xl font-bold hover:scale-125 transition z-20"
                        >
                            ›
                        </button>

                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-125 transition z-20"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PhotoCollage;
