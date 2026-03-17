import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function GlobalAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Set a pleasant background volume

    const tryPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked by browser. Waiting for user interaction.", err);
        setIsPlaying(false);
      });
    };

    // Attempt to play immediately on mount
    tryPlay();

    // Fallback: Play on the first user interaction if autoplay was blocked
    const onInteract = () => {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', onInteract);
      document.removeEventListener('keydown', onInteract);
      document.removeEventListener('touchstart', onInteract);
    };

    document.addEventListener('click', onInteract);
    document.addEventListener('keydown', onInteract);
    document.addEventListener('touchstart', onInteract);

    return () => {
      document.removeEventListener('click', onInteract);
      document.removeEventListener('keydown', onInteract);
      document.removeEventListener('touchstart', onInteract);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed z-[100] bottom-10 lg:bottom-12 left-5">
      <audio 
        ref={audioRef} 
        src="https://raw.githubusercontent.com/Cam0411/music__9/main/%F0%9F%8C%AC%EF%B8%8F%20Chill%20Piano%20Electronic%20Music%20(For%20Videos)%20-%20_Home_%20by%20Neutrin05%20%F0%9F%87%BA%F0%9F%87%B8%20%5BxneiaE_SCg8%5D.mp3" 
        loop 
      />
      <button 
        onClick={togglePlay}
        className="flex items-center gap-3 bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full hover:bg-[#0a0f1c] transition-all shadow-2xl group"
      >
        <div className="flex items-end gap-[3px] h-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-white rounded-full"
              animate={{ 
                height: isPlaying ? ['20%', '100%', '40%', '80%', '20%'] : '20%' 
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              style={{ height: '20%' }}
            />
          ))}
        </div>
        <span className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
          {isPlaying ? 'Sound On' : 'Sound Off'}
        </span>
      </button>
    </div>
  );
}
