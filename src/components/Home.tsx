import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu as MenuIcon, MousePointer2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from './ContactPopup';
import MobileMenu from './MobileMenu';

export default function Home() {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const navItems = [
    { 
      path: '/art-branding', 
      label: 'Art Branding', 
      desc: 'Trải nghiệm số độc bản',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      accent: 'from-blue-500/20'
    },
    { 
      path: '/conversion-performance', 
      label: 'Conversion', 
      desc: 'Tối ưu hóa chuyển đổi',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200',
      accent: 'from-emerald-500/20'
    },
    { 
      path: '/sales-creator', 
      label: 'Sales Creator', 
      desc: 'Hệ thống bán hàng video',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      accent: 'from-indigo-500/20'
    },
    { 
      path: '/personal-branding', 
      label: 'Personal Brand', 
      desc: 'Định vị chuyên gia',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200',
      accent: 'from-purple-500/20'
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle services on mobile for "wow" effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % navItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col relative bg-[#050505] text-white overflow-hidden font-sans selection:bg-white/20">
      {/* Interactive Cursor Glow */}
      <motion.div 
        className="fixed w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0 hidden lg:block"
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
      />

      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 0.4, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={navItems[activeService].image} 
              alt="Background" 
              className="w-full h-full object-cover mix-blend-screen"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-b ${navItems[activeService].accent} via-[#050505]/80 to-[#050505] transition-colors duration-1000`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      {/* Header - Fixed Frame Style */}
      <header className="fixed top-0 w-full grid grid-cols-3 items-center p-6 md:p-10 z-50">
        <div className="flex justify-start">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500">
              <MenuIcon size={16} />
            </div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase hidden sm:inline">Khám phá</span>
          </button>
        </div>
        
        <div className="flex justify-center flex-col items-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[clamp(1.25rem,4vw,2.5rem)] font-black tracking-[0.4em] uppercase whitespace-nowrap"
          >
            WinHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[8px] md:text-[10px] font-medium tracking-[0.1em] text-white/40 uppercase whitespace-nowrap hidden md:block"
          >
            Chiến lược sắc bén — Sáng tạo không giới hạn
          </motion.p>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-10 h-10 md:w-auto md:px-6 md:py-2.5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <Mail size={16} className="md:hidden" />
            <span className="hidden md:inline">Kết nối</span>
          </button>
        </div>
      </header>

      {/* Main Content - Editorial Layout */}
      <main className="flex-1 flex flex-col relative z-10 px-6 md:px-12">
        
        {/* Top Meta Info */}
        <div className="pt-32 md:pt-40 flex justify-between items-start">
          <div className="max-w-[200px] md:max-w-xs">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4"
            >
              Agency Chiến lược
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-white/60 leading-relaxed font-light"
            >
              Kiến tạo trải nghiệm số độc bản thông qua <span className="text-white">nghệ thuật & hiệu suất</span>.
            </motion.p>
          </div>
          <div className="hidden md:block text-right">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4"
            >
              Địa điểm / Thời gian
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-white/60 font-mono uppercase"
            >
              VIỆT NAM — 09:36 AM
            </motion.p>
          </div>
        </div>

        {/* Center Hero Text - Massive Editorial Typography */}
        <div className="flex-1 flex flex-col justify-center items-center text-center relative">
          {/* Mobile Slogan */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-4 md:hidden"
          >
            Chiến lược sắc bén — Sáng tạo không giới hạn
          </motion.p>

          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="text-[clamp(0.6rem,1vw,0.75rem)] font-bold tracking-[0.5em] uppercase text-white/30 mb-6 block">
              {navItems[activeService].desc}
            </span>
            <h2 className="text-[clamp(2.5rem,12vw,10rem)] font-black leading-[0.8] tracking-tighter uppercase mb-8">
              {navItems[activeService].label.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-transparent stroke-white stroke-1' : ''} style={{ WebkitTextStroke: i % 2 !== 0 ? '1px rgba(255,255,255,0.3)' : 'none' }}>
                  {word}{' '}
                  {i === 0 && <br className="md:hidden" />}
                </span>
              ))}
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(navItems[activeService].path)}
              className="group inline-flex items-center gap-4 px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Xem dự án</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-black/20 transition-colors">
                <ArrowRight size={14} />
              </div>
            </motion.button>
          </motion.div>

          {/* Service Indicators */}
          <div className="absolute bottom-0 flex gap-4">
            {navItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveService(i)}
                className={`h-1.5 transition-all duration-700 rounded-full ${activeService === i ? 'w-16 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pb-10 md:pb-12 flex justify-between items-end">
          <div className="flex flex-col gap-2">
        
          </div>

          <div className="hidden lg:flex items-center gap-4 text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
            <MousePointer2 size={12} className="animate-bounce" />
            <span>Di chuyển chuột để khám phá</span>
          </div>
        </div>
      </main>

      {/* Background Floating Elements for "Wow" */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            rotate: [0, -15, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" 
        />
      </div>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
