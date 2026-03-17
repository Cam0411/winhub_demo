import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader({ onFinished }: { onFinished: () => void }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const exitTimer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinished, 800);
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          <div className="relative flex flex-col items-center justify-center w-full max-w-7xl px-4">
            <div className="flex items-center justify-center w-full">
              {/* Win */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[15vw] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400"
              >
                Win
              </motion.span>

              {/* Connecting Line - Main Loading Indicator */}
              <div className="relative flex-1 max-w-[200px] md:max-w-[400px] h-[2px] md:h-[4px] mx-4 md:mx-8">
                {/* Background Line */}
                <div className="absolute inset-0 bg-white/5" />
                
                {/* Progress Line */}
                <motion.div
                  className="absolute h-[12px] inset-y-0 left-0 bg-gradient-to-r from-slate-400 to-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Scanning Light Effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>

              {/* Hub */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[8vw] md:text-[10vw] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400"
              >
                Hub
              </motion.span>
            </div>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 md:mt-16 text-center"
            >
              <p className="text-white/40 text-sm md:text-xl font-light tracking-[0.4em] uppercase">
                Kết nối giá trị - kiến tạo bền vững
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-white/40 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Background Atmosphere */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.02] rounded-full blur-[120px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
