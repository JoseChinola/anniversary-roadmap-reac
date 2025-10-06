import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Corazones flotando dentro del modal
const FloatingHeartsModal = () => {
  const heartsArray = Array.from({ length: 8 });
  return (
    <>
      {heartsArray.map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute text-pink-400 text-xl"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          initial={{ y: 100, opacity: 0, scale: 0 }}
          animate={{ y: -50, opacity: 1, scale: 1 }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: idx * 0.3,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
};

const Modal = ({ isOpen, onClose, memory }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-pink-50 via-white to-pink-100 text-black rounded-2xl shadow-2xl p-6 max-w-4xl w-full h-fit my-10 overflow-hidden"
          >
            {/* Corazones flotando */}
            <FloatingHeartsModal />

            <h3 className="text-3xl font-bold mb-4 text-center text-pink-600 drop-shadow-lg">
              {memory.year}
            </h3>

            <motion.h1
              className="text-pink-500 mb-6 text-3xl text-center font-extrabold leading-tight drop-shadow-2xl"
              initial="hidden"
              animate="visible"
            >
              {memory.title.split(" ").map((word, wordIdx) => (
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
                  delay: memory.title.length * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {memory.icon}
              </motion.span>
            </motion.h1>


            {/* Carrusel Swiper */}
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper mb-8"
            >
              {memory.images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <motion.img
                    src={img}
                    alt={`Foto ${idx + 1} del ${memory.year}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    className="rounded-lg shadow-lg w-full h-44"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <motion.p
              className="mb-6 text-pink-500 max-w-lg text-center text-lg md:text-xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {memory.text}
            </motion.p>


            <div className="flex justify-center mt-6">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
