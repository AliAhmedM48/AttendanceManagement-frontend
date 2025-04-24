import { motion } from "framer-motion";
import "./style.css"; // تأكد من استيراد CSS بشكل صحيح

function Attendance() {
  return (
    <>
      <main
        style={{
          minHeight: "calc(100dvh - 48px)",
          minWidth: "calc(100dvw - 500px)",
        }}
        className="flex-1 flex items-stretch lg:items-center justify-center min-w-full text-white lg:p-6"
      >
        <motion.div
          className="relative bg-gradient-to-br from-[#1e165c] to-[#3d2c91] bg-opacity-10 p-10 rounded-2xl shadow-2xl text-center lg:max-w-3xl xl:max-w-[98%] lg:px-28"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* النص المتحرك */}
          <motion.h1
            className="text-xl cursor-crosshair select-none md:text-3xl lg:text-4xl xl:text-7xl w-full font-bold mb-4 xl:py-12 lg:mb-8 bg-clip-text text-white bg-gradient-to-r from-[#ff0000] via-[#11ff00] to-[#002ee8] animate-gradient p-4"
            animate={{
              backgroundPosition: [
                "0% 10% 20% 30% 40% 50%",
                "100% 90% 80% 70% 60% 50%",
                "0% 50%",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="word"
              whileHover={{
                x: -80,
                y: -20,
                scale: 1.5,
                rotate: -80,
                transition: { duration: 0.1, stiffness: 900 },
              }}
            >
              Page
            </motion.span>{" "}
            <motion.span
              className="word"
              whileHover={{
                x: 80,
                y: 10,
                scale: 0.6,
                rotate: 50,
                transition: { duration: 0.1, stiffness: 900 },
              }}
            >
              Under
            </motion.span>{" "}
            <motion.span
              className="word"
              whileHover={{
                x: -70,
                y: -30,
                scale: 1.5,
                rotate: -95,
                transition: { duration: 0.1, stiffness: 900 },
              }}
            >
              Construction
            </motion.span>
          </motion.h1>

          {/* النص الآخر */}
          <motion.p
            className="text-sm md:text-lg mb-6 border-t-4 border-b-4 border-white p-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            We're currently working on this page to bring you something amazing.
            Please check back soon!
          </motion.p>

          <motion.blockquote
            className="italic text-sm md:text-base text-white/80 border-l-4 border-white pl-4 bg-black/40 shadow-lg p-4"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            “Great things are not done by impulse, but by a series of small
            things brought together.” — Vincent van Gogh
          </motion.blockquote>
        </motion.div>
      </main>
    </>
  );
}

export default Attendance;
