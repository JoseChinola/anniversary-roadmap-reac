import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination, EffectCoverflow } from "swiper/modules";

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
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black rounded-2xl shadow-2xl p-6 max-w-4xl w-full h-full max-h-4/6 my-10"
          >
            <h3 className="text-3xl font-bold mb-4 text-center">
              {memory.year}
            </h3>
            <p className="text-lg text-center mb-6">{memory.text}</p>

            {/* Carrusel Swiper */}
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2} // por defecto en móviles
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
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
              className="mySwiper"
            >
              {memory.images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <motion.img
                    src={img}
                    alt={`Foto ${idx + 1} del ${memory.year}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="rounded-lg shadow-lg w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Texto flotante */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-4 text-center bg-pink-100 rounded-xl p-4 shadow-inner h-48"
            >
              <p className="text-lg font-medium">
                Este año fue especial porque vivimos momentos únicos que
                marcaron nuestra historia. 💕
              </p>
            </motion.div>

            <div className="flex justify-center mt-6">
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
