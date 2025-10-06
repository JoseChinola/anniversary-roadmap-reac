import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Componente de corazones flotantes
const FloatingHeartsFooter = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const createHeart = () => {
            const size = Math.random() * 18 + 12;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 4;

            setHearts((prev) => [...prev, { id: Date.now(), size, left, duration }]);
            setTimeout(() => {
                setHearts((prev) => prev.slice(1));
            }, duration * 1000);
        };

        const interval = setInterval(createHeart, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute text-pink-400"
                    style={{ fontSize: heart.size, left: `${heart.left}%` }}
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

const RomanticFooter = () => {
    return (
        <footer className="relative bg-gradient-to-t from-pink-50 to-white py-32 overflow-hidden">
            {/* Corazones flotando */}
            <FloatingHeartsFooter />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center px-6"
            >
                <h2 className="text-3xl md:text-4xl font-serif italic text-pink-600 mb-4 drop-shadow-lg">
                    Hoy celebramos 7 años de amor, y esto es solo el comienzo 💕
                </h2>
                <p className="text-pink-400 text-lg md:text-xl font-medium">
                    13 Octubre 2017 – 13 Octubre 2025
                </p>
            </motion.div>

            {/* Línea decorativa */}
            <motion.div
                className="w-24 h-1 bg-pink-300 rounded-full mt-12 mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
        </footer>
    );
};

export default RomanticFooter;