import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Home, Layout, BarChart, Video, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenContact }: MobileMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/art-branding', label: 'Art Branding Website', icon: Layout },
    { path: '/conversion-performance', label: 'Tối ưu Chuyển đổi', icon: BarChart },
    { path: '/sales-creator', label: 'Chương trình Sales Creator', icon: Video },
    { path: '/personal-branding', label: 'Thương hiệu Cá nhân', icon: User },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleContact = () => {
    onClose();
    onOpenContact();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#0a0a0a] z-[101] flex flex-col shadow-2xl border-r border-white/10 overflow-hidden"
          >
            {/* Background Blurs for "Wow" */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-blue-600/30 rounded-full blur-[100px]" />
              <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-emerald-600/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center px-8 py-7 border-b border-white/5">
                <span className="text-2xl font-black tracking-tighter uppercase text-white">WinHub</span>
                <button 
                  onClick={onClose}
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 group"
                >
                  <X size={22} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-10 px-6 space-y-3 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style dangerouslySetInnerHTML={{ __html: '.scrollbar-none::-webkit-scrollbar { display: none; }' }} />
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-8 px-4">Điều hướng</p>
                <div className="space-y-3">
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.button
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-500 group ${
                          isActive ? 'bg-white text-black shadow-xl shadow-white/5' : 'text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-5 text-left">
                          <item.icon size={22} className={`shrink-0 ${isActive ? 'text-black' : 'text-white/30 group-hover:text-white transition-colors'}`} />
                          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em] leading-tight">{item.label}</span>
                        </div>
                        <ArrowRight size={18} className={`shrink-0 ${isActive ? 'text-black' : 'text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all'}`} />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-16 pb-4">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-8 px-4">Liên hệ</p>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 px-4">
                    {['Instagram', 'Facebook', 'Behance', 'LinkedIn'].map((social) => (
                      <a key={social} href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">{social}</a>
                    ))}
                  </div>
                </div>

                <div className="pt-12 pb-12">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-6 px-4">Tầm nhìn</p>
                  <p className="text-[11px] text-white/30 leading-relaxed px-4 font-medium italic">
                    "WinHub kiến tạo những trải nghiệm số độc bản, kết hợp giữa nghệ thuật thương hiệu và hiệu suất kinh doanh vượt trội."
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <button 
                  onClick={handleContact}
                  className="w-full py-5 bg-[#0066cc] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0052a3] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#0066cc]/20"
                >
                  Bắt đầu dự án
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
