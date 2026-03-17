import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const services = [
  { path: '/art-branding', label: 'Art Branding' },
  { path: '/conversion-performance', label: 'Tối ưu Chuyển đổi' },
  { path: '/sales-creator', label: 'Sales Creator' },
  { path: '/personal-branding', label: 'Thương hiệu Cá nhân' },
];

export default function ServiceSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = services.findIndex(s => s.path === location.pathname);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <section className="lg:hidden py-20 px-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-4">Dịch vụ tiếp theo</span>
        <button 
          onClick={() => navigate(nextService.path)}
          className="group flex flex-col items-center"
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter text-white group-hover:text-[#0066cc] transition-colors duration-500">
            {nextService.label}
          </h2>
          <div className="mt-6 flex items-center gap-4 text-white/60 group-hover:text-white transition-colors">
            <span className="text-xs font-bold tracking-widest uppercase">Khám phá ngay</span>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowRight size={20} />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
