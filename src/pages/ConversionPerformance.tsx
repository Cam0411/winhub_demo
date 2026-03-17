import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ArrowRight, Menu as MenuIcon, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactPopup from '../components/ContactPopup';
import MobileMenu from '../components/MobileMenu';
import ServiceSwitcher, { services } from '../components/ServiceSwitcher';

export default function ConversionPerformance() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentIndex = services.findIndex(s => s.path === location.pathname);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <div className="min-h-screen bg-[#e2e4e5] text-[#111] font-sans relative selection:bg-[#111] selection:text-[#e2e4e5] overflow-x-hidden">
      {/* Background Texture Simulation - Topographic Map Style */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover'
      }}></div>
      
      {/* Subtle gradients for depth */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-black/10 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center bg-[#e2e4e5]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex-1 flex justify-start items-center gap-3 md:gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <MenuIcon size={16} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-[10px] font-bold tracking-widest uppercase hidden sm:inline">Trang chủ</span>
        </div>
        
        <h1 className="flex-shrink-0 text-[clamp(0.875rem,2vw,1.125rem)] font-serif italic px-4 whitespace-nowrap">
          Conversion Performance
        </h1>
        
        <div className="flex-1 flex justify-end items-center gap-4">
          <button 
            onClick={() => navigate(nextService.path)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors group"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover:text-black/70 transition-colors">Tiếp theo:</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-black">{nextService.label}</span>
            <ArrowRight size={12} className="text-[#0066cc] group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-9 h-9 md:w-auto md:px-6 md:py-2.5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            <Mail size={14} className="md:hidden" />
            <span className="hidden md:inline">Kết nối</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 pt-24 md:pt-0">
        {/* Hero Section */}
        <section className="pt-20 md:pt-32 pb-20 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-[clamp(0.65rem,1vw,0.875rem)] font-semibold tracking-[0.3em] uppercase mb-4 md:mb-6 block text-[#111]">
              G I Ả I &nbsp; P H Á P
            </span>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] uppercase max-w-6xl">
              GIẢI PHÁP THẾ HỆ MỚI <br/>
              CHO KỶ NGUYÊN SỐ
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-8 mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 lg:col-span-6"
            >
              <p className="font-serif italic text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.2] text-[#111] mb-8 pr-8">
                Sự đổi mới không chỉ là về công nghệ.<br/>
                Đó là việc định hình lại cách thương hiệu kết nối, sáng tạo và bán hàng.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 lg:col-span-5 lg:col-start-8 pt-2 md:pt-4"
            >
              <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed font-medium text-[#111]/80">
                Các giải pháp kỹ thuật số tiên tiến của chúng tôi trao quyền cho doanh nghiệp để luôn dẫn đầu, tối ưu hóa quy trình và mang lại trải nghiệm nhập vai thu hút người tiêu dùng hiện đại.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Big Quote Section */}
        <section className="py-40 px-6 md:px-12 relative">
          <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif italic text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] mb-10"
            >
              Kết quả? Triển khai <br/>nhanh chóng và dễ dàng.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(1rem,1.25vw,1.125rem)] font-medium text-[#111]/80 max-w-2xl"
            >
              Các giải pháp của chúng tôi hiệu quả, đáng tin cậy và đã được kiểm chứng trên thị trường để cung cấp cho bạn một giải pháp đơn giản và đáng tin cậy.
            </motion.p>
          </div>
        </section>

        {/* Another Big Quote */}
        <section className="py-40 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto text-center relative">
            <span className="absolute top-[-4rem] left-1/2 -translate-x-1/2 text-[12rem] font-black text-[#111]/10 leading-none select-none">“</span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] relative z-10 max-w-5xl mx-auto"
            >
              Từ mô phỏng UX siêu thực đến showroom kỹ thuật số điều khiển bằng AI, chúng tôi thu hẹp khoảng cách giữa sự sáng tạo và hiệu quả.
            </motion.h2>
          </div>
        </section>

        {/* Features / Core Elements */}
        <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {[
              { title: 'UX Tối Ưu', desc: 'Thiết kế hành trình người dùng để giảm ma sát.' },
              { title: 'Copywriting', desc: 'Nội dung được viết để thúc đẩy hành động.' },
              { title: 'Thiết kế Phễu', desc: 'Website được xây dựng theo logic phễu marketing.' },
              { title: 'Theo dõi Dữ liệu', desc: 'Theo dõi hành vi để liên tục tối ưu chuyển đổi.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-[#111] pt-8"
              >
                <span className="text-xs font-bold tracking-widest uppercase mb-6 block text-[#111]/40">0{i + 1}</span>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-[#111]/70 font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Target & Results */}
        <section className="py-32 px-6 md:px-12 border-t border-[#111]/10 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-16 border-b border-[#111]/10 pb-6 text-[#111]/60">Phù hợp với</h2>
              <ul className="space-y-0">
                {['Giáo dục', 'SaaS', 'Thương mại điện tử', 'Dịch vụ B2B', 'Chiến dịch Landing Page'].map((tag, i) => (
                  <li key={i} className="text-[clamp(2rem,3vw,3rem)] font-serif italic border-b border-[#111]/10 py-8 hover:pl-8 transition-all duration-300 cursor-default">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-16 border-b border-[#111]/10 pb-6 text-[#111]/60">Kết quả đạt được</h2>
              <ul className="space-y-12 pt-4">
                {[
                  'Tăng lượng lead chất lượng cao', 
                  'Tăng doanh thu trực tiếp từ website', 
                  'Giảm chi phí quảng cáo (CPA) đáng kể',
                  'Website trở thành kênh bán hàng thực thụ'
                ].map((result, i) => (
                  <li key={i} className="flex gap-8 items-start group">
                    <span className="text-xs font-bold tracking-widest mt-2 text-[#111]/40 group-hover:text-[#111] transition-colors">0{i + 1}</span>
                    <span className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-tight tracking-tight">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-40 px-6 md:px-12 text-center bg-[#111] text-[#e4e5e6]">
          <h2 className="text-[clamp(4rem,8vw,8rem)] font-black uppercase tracking-tighter mb-16 leading-[0.9]">
            Sẵn sàng <br/> tăng trưởng?
          </h2>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#e4e5e6] text-[#111] rounded-full font-bold text-sm tracking-[0.2em] uppercase hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Tư vấn chiến lược <ArrowUpRight size={20} />
          </button>
        </section>
        <ServiceSwitcher />
      </main>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}

