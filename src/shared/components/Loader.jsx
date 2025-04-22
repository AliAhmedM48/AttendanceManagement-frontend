import { motion } from "framer-motion";
import ThemeWrapper from "./ThemeWrapper";

export default function Loader() {
  return (
    <ThemeWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 border-4 border-white border-t-[#0a9d81] rounded-full animate-spin mb-6" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg font-semibold text-white"
        >
          Loading...
        </motion.p>
      </motion.div>
    </ThemeWrapper>
  );
}
