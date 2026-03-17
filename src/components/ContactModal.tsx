import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-3xl font-serif text-white mb-2">Nhận tư vấn</h2>
            <p className="text-white/50 text-sm mb-8">Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">Tên của bạn</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Nguyễn Văn A" required />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="email@example.com" required />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-2">Dịch vụ quan tâm</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 appearance-none transition-colors">
                  <option value="art-branding" className="bg-[#111]">Art Branding Website</option>
                  <option value="conversion" className="bg-[#111]">Conversion Performance</option>
                  <option value="sales-creator" className="bg-[#111]">Sales Creator Program</option>
                  <option value="personal-branding" className="bg-[#111]">Personal Branding Program</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold tracking-widest uppercase text-sm py-4 rounded-xl mt-6 hover:bg-white/90 transition-colors">
                Gửi yêu cầu
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
