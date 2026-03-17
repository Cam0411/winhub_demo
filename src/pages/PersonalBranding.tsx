import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Award, Mic, Globe, Users, Menu as MenuIcon, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactPopup from '../components/ContactPopup';
import MobileMenu from '../components/MobileMenu';
import ServiceSwitcher, { services } from '../components/ServiceSwitcher';

export default function PersonalBranding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentIndex = services.findIndex(s => s.path === location.pathname);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <div className="min-h-screen bg-[#0a1118] text-white font-sans selection:bg-[#00d2ff] selection:text-black relative overflow-x-hidden">
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2500&auto=format&fit=crop" 
          alt="Atmospheric Mountain Landscape" 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1118] via-[#0a1118]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-transparent to-transparent" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center p-6 md:p-8 z-50 border-b border-white/5 bg-[#0a1118]/80 backdrop-blur-md">
        <div className="flex-1 flex justify-start items-center gap-3 md:gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <MenuIcon size={16} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-[10px] font-bold tracking-widest uppercase hidden sm:inline">Trang chủ</span>
        </div>
        
        <h1 className="flex-shrink-0 text-[clamp(0.875rem,2vw,1.125rem)] font-serif italic px-4 whitespace-nowrap">
          Personal Branding
        </h1>
        
        <div className="flex-1 flex justify-end items-center gap-4">
          <button 
            onClick={() => navigate(nextService.path)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors group"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">Tiếp theo:</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">{nextService.label}</span>
            <ArrowRight size={12} className="text-[#0066cc] group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-9 h-9 md:w-auto md:px-6 md:py-2.5 bg-[#00d2ff] text-black rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            <Mail size={14} className="md:hidden" />
            <span className="hidden md:inline">Kết nối</span>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-6 md:px-12 max-w-[1600px] mx-auto pt-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-[clamp(0.6rem,1vw,0.7rem)] font-bold tracking-[0.3em] uppercase text-[#00d2ff]">
                D Ự &nbsp; Á N &nbsp; T I Ê U &nbsp; B I Ể U &nbsp; / / &nbsp; 0 1
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter text-white leading-[0.9] uppercase"
            >
              Trở thành người có ảnh hưởng <br/>
              <span className="text-[#00d2ff]">trong ngành của bạn</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 md:mt-8 text-[clamp(0.75rem,1.5vw,1rem)] text-white/60 leading-relaxed max-w-md font-mono uppercase tracking-widest"
            >
              Xây dựng thương hiệu cá nhân thông qua video ngắn.
            </motion.p>
          </div>
        </section>

        {/* Insight Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto text-center border-t border-white/10 relative z-10 bg-[#0a1118]/80 backdrop-blur-md rounded-3xl mt-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop" 
              alt="Business Meeting" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1118] via-transparent to-[#0a1118]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-[0.2em] uppercase text-[#00d2ff] mb-8">Thấu hiểu</h2>
            <h3 className="text-[clamp(2rem,4vw,3rem)] font-black mb-12 uppercase tracking-tight">
              Thế giới đang chuyển từ:<br/>
              <span className="text-white/50">Niềm tin Thương hiệu → Niềm tin Con người</span>
            </h3>
            
            <p className="text-[clamp(1.25rem,2.5vw,1.5rem)] text-white/70 mb-12 font-medium">Khách hàng tin:</p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {[
                { role: 'Nhà sáng lập', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=800&auto=format&fit=crop' },
                { role: 'Chuyên gia', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop' },
                { role: 'Lãnh đạo', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-white/20 group-hover:border-[#00d2ff] transition-colors duration-500 relative">
        
                    <div className="absolute inset-0 bg-[#00d2ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  <span className="text-[clamp(1.125rem,2vw,1.25rem)] font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{item.role}</span>
                </div>
              ))}
            </div>
            
            <p className="text-[clamp(1.5rem,3vw,1.875rem)] text-white font-black uppercase">Hơn là logo doanh nghiệp.</p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" 
                  alt="Expert" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] to-transparent" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-[0.2em] uppercase text-[#00d2ff] mb-8">Giải pháp</h2>
              <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-12 leading-[1.1] uppercase tracking-tighter">
                CHQ giúp bạn xây dựng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-500">Hệ thống Video Thương hiệu Cá nhân</span>
              </h3>
              <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-white/70 mb-12 font-medium">Bao gồm:</p>
              <ul className="space-y-8">
                {[
                  'định vị cá nhân',
                  'chiến lược nội dung',
                  'kể chuyện qua video',
                  'phân phối nội dung'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-[clamp(1.125rem,1.5vw,1.25rem)] font-bold uppercase tracking-wide border-b border-white/10 pb-6">
                    <span className="text-[#00d2ff] font-mono text-[clamp(1.25rem,2.5vw,1.5rem)]">0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Outcome Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
          <h2 className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-[0.2em] uppercase text-[#00d2ff] mb-8 text-center">Kết quả</h2>
          <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-20 text-center uppercase tracking-tighter">Sau 6 tháng bạn sẽ có:</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Kênh nội dung chuyên môn', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
              { title: 'Hình ảnh chuyên gia', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop' },
              { title: 'Cộng đồng người theo dõi', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop' },
              { title: 'Cơ hội kinh doanh mới', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop' }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-[#0a1118]/50 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-10 h-10 rounded-full bg-[#00d2ff]/20 flex items-center justify-center mb-6 border border-[#00d2ff]/30 group-hover:bg-[#00d2ff] transition-colors duration-500">
                    <span className="text-white font-mono text-sm">0{i + 1}</span>
                  </div>
                  <h4 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-bold uppercase tracking-wide leading-snug">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who is this for & CTA */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center border-t border-white/10 relative z-10">
          <h2 className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-[0.2em] uppercase text-[#00d2ff] mb-16">Dành cho ai</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-32">
            {['CEO', 'Nhà sáng lập', 'Giám đốc', 'Quản lý', 'Chuyên gia'].map((tag, i) => (
              <span key={i} className="px-8 py-3 rounded-full border border-white/20 text-[clamp(0.75rem,1vw,0.875rem)] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>

          <div className="p-8 md:p-16 border border-white/20 rounded-[40px] relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
                alt="Global Network" 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1118]/90 via-[#0a1118]/80 to-[#00d2ff]/20" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-black mb-10 uppercase tracking-tighter text-center">Khẳng định vị thế chuyên gia</h2>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="px-8 md:px-12 py-4 md:py-5 bg-[#00d2ff] text-black rounded-full font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase hover:bg-white transition-colors"
              >
                Bắt đầu hành trình
              </button>
            </div>
          </div>
        </section>
        <ServiceSwitcher />
      </main>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
