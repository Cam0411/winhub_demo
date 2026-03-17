import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, CheckCircle2, Send } from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    service: 'art-branding',
    message: ''
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Vui lòng nhập số điện thoại';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('sending');
    
    try {
      const apiKey = 'dd80882b6cdb426cbf9bddbcf3bdc1f8';
      const workspaceId = '2541';

      const response = await fetch(`https://crm.pancake.vn/api/workspaces/${workspaceId}/lead/records?api_key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone_number,
          email: formData.email,
          note: `Dịch vụ: ${formData.service}\nLời nhắn: ${formData.message}`
        }),
      });

      if (!response.ok) throw new Error('Lỗi API');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone_number: '', service: 'art-branding', message: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3500);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          {/* Immersive Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          {/* Animated Glow Background Spots */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -60, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" 
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full max-w-[520px] bg-[#0D1525]/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_80px_rgba(37,99,235,0.15)] backdrop-blur-2xl overflow-hidden group"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] p-[1px] pointer-events-none overflow-hidden">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#3b82f6_180deg,transparent_210deg,transparent_360deg)] opacity-40"
              />
              <div className="absolute inset-[1px] bg-[#0D1525] rounded-[2.5rem]" />
            </div>

            <div className="relative z-10">
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 p-3 text-white/20 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="py-16 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                  >
                    <CheckCircle2 className="text-blue-400 w-12 h-12" />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase">Tuyệt vời!</h2>
                    <p className="text-blue-200/60 font-medium">Yêu cầu của bạn đã được gửi đi một cách hoàn hảo.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">Ready to start</span>
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                      Bắt đầu <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic font-serif font-light lowercase tracking-normal">dự án của bạn.</span>
                    </h2>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1 group/input">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Họ và tên *"
                        className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all placeholder:text-white/20`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Số điện thoại *"
                        className={`w-full bg-white/[0.03] border ${errors.phone_number ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all placeholder:text-white/20`}
                      />
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all placeholder:text-white/20"
                      />
                    </div>

                    <div className="relative">
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-[#0D1525] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-[#161f31] transition-all appearance-none cursor-pointer"
                      >
                        <option value="art-branding" className="bg-[#0D1525] text-white">Bạn quan tâm dịch vụ nào?</option>
                        <option value="art-branding" className="bg-[#0D1525] text-white">Art Branding Website</option>
                        <option value="conversion" className="bg-[#0D1525] text-white">Conversion Performance</option>
                        <option value="sales-creator" className="bg-[#0D1525] text-white">Sales Creator Program</option>
                        <option value="personal-branding" className="bg-[#0D1525] text-white">Personal Branding</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Chia sẻ thêm về mục tiêu của bạn..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all resize-none placeholder:text-white/20"
                    />

                    <motion.button 
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === 'sending'}
                      className="relative w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:from-blue-500 hover:to-indigo-500 transition-all mt-4 flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                      {status === 'sending' ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <>
                          Gửi yêu cầu ngay <Send size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
