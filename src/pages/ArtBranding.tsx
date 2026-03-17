import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Twitter, ArrowRight, ArrowLeft, Menu as MenuIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactPopup from '../components/ContactPopup';
import MobileMenu from '../components/MobileMenu';
import ServiceSwitcher, { services } from '../components/ServiceSwitcher';

const sections = [
  { id: 'art-branding', label: 'ART BRANDING' },
  { id: 'trai-nghiem', label: 'TRẢI NGHIỆM' },
  { id: 'flagship', label: 'FLAGSHIP' },
  { id: 'yeu-to', label: 'YẾU TỐ' },
  { id: 'phu-hop', label: 'PHÙ HỢP' },
  { id: 'ket-qua', label: 'KẾT QUẢ' },
  { id: 'quy-trinh', label: 'QUY TRÌNH' },
];

const contentData: Record<string, any> = {
  'art-branding': {
    num: '01',
    sectionName: 'Art Branding',
    title: 'Website không\nchỉ để xem.',
    subtitle: 'Website phải khiến thương hiệu được\ncảm nhận.',
    desc: 'Art Branding Website là loại website được thiết kế như một tác\nphẩm nghệ thuật thương hiệu, nơi mọi chuyển động, hình ảnh\nvà câu chuyện đều phục vụ cho một mục tiêu: tạo dấu ấn\nthương hiệu.',
    cta: 'KHÁM PHÁ ART BRANDING WEBSITE',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    next: 'Trải nghiệm'
  },
  'trai-nghiem': {
    num: '02',
    sectionName: 'Trải nghiệm',
    title: 'Khi website trở\nthành trải\nnghiệm thương\nhiệu',
    subtitle: '',
    desc: 'Một số thương hiệu không cần website để bán hàng. Họ cần\nwebsite để truyền tải triết lý, văn hóa doanh nghiệp và thể hiện\nhệ giá trị tinh tế.',
    list: [
      'Truyền tải triết lý, văn hóa doanh nghiệp',
      'Thể hiện hệ giá trị tinh tế của thương hiệu',
      'Tạo ấn tượng cảm xúc và được ghi nhớ'
    ],
    cta: 'TÌM HIỂU THÊM',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    next: 'Flagship'
  },
  'flagship': {
    num: '03',
    sectionName: 'Flagship',
    title: 'Website như một\n"Digital Flagship\nStore"',
    subtitle: 'Nâng tầm giá trị sản phẩm qua không gian số.',
    desc: 'Trong thế giới vật lý, các thương hiệu lớn xây dựng Flagship Store. Không phải để bán hàng nhiều nhất. Mà để:',
    list: [
      'thể hiện đẳng cấp thương hiệu',
      'tạo trải nghiệm đáng nhớ',
      'xây dựng nhận diện mạnh mẽ'
    ],
    cta: 'XEM CÁC DỰ ÁN FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    next: 'Yếu tố'
  },
  'yeu-to': {
    num: '04',
    sectionName: 'Yếu tố',
    title: 'Những yếu tố\ntạo nên Art\nBranding Website',
    subtitle: '',
    desc: 'Website được xây dựng như một câu chuyện thương hiệu xuyên suốt, với thiết kế hình ảnh mang tính thẩm mỹ cao và độc bản.',
    list: [
      'Brand Storytelling',
      'Visual Experience',
      'Motion & Interaction',
      'Emotional Design'
    ],
    cta: 'TƯ VẤN THIẾT KẾ',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
    next: 'Phù hợp'
  },
  'phu-hop': {
    num: '05',
    sectionName: 'Phù hợp',
    title: 'Dành cho ai?',
    subtitle: 'Những thương hiệu cần sự khác biệt.',
    desc: 'Art Branding Website không dành cho tất cả. Nó dành cho những ai muốn tạo ra một trải nghiệm không thể quên.',
    list: [
      'Luxury brands',
      'Architecture / Interior',
      'Creative studios / Agency',
      'Personal brand / Startup cần định vị'
    ],
    cta: 'BẠN CÓ PHÙ HỢP?',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop',
    next: 'Kết quả'
  },
  'ket-qua': {
    num: '06',
    sectionName: 'Kết quả',
    title: 'Website định\nnghĩa thương\nhiệu',
    subtitle: 'Không chỉ hiển thị thông tin.',
    desc: 'Một website branding tốt sẽ giúp thương hiệu trở nên đáng nhớ, khác biệt và đáng tin cậy trong mắt khách hàng.',
    cta: 'XEM CASE STUDY',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    next: 'Quy trình'
  },
  'quy-trinh': {
    num: '07',
    sectionName: 'Quy trình',
    title: 'Quy trình\nxây dựng',
    subtitle: 'Từ ý tưởng đến trải nghiệm số.',
    desc: 'Chúng tôi kết hợp chiến lược, công nghệ và sáng tạo để kiến tạo những trải nghiệm số mang lại tăng trưởng đột phá.',
    list: [
      'Brand Strategy',
      'Website Narrative',
      'Experience Design',
      'Development'
    ],
    cta: 'BẮT ĐẦU DỰ ÁN',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    next: 'Art Branding'
  }
};

export default function ArtBranding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`GMT ${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeSectionId = sections[activeSectionIndex].id;
  const content = contentData[activeSectionId] || contentData['art-branding'];

  const currentIndex = services.findIndex(s => s.path === location.pathname);
  const nextService = services[(currentIndex + 1) % services.length];

  const handleNext = () => {
    setActiveSectionIndex((prev) => (prev + 1) % sections.length);
  };

  return (
    <div className="min-h-[max(100vh,850px)] bg-[#111111] text-[#e5e5e5] font-sans overflow-x-hidden relative flex flex-col selection:bg-white/20">
      {/* Background Texture/Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-black/80 via-transparent to-transparent" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full flex justify-between items-center p-6 md:p-8 z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/5">
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
          Art Branding Studio
        </h1>
        
        <div className="flex-1 flex justify-end items-center gap-4">
          <button 
            onClick={() => navigate(nextService.path)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors group"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">Tiếp theo:</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white">{nextService.label}</span>
            <ArrowRight size={12} className="text-[#0066cc] group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-9 h-9 md:w-auto md:px-6 md:py-2.5 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            <Mail size={14} className="md:hidden" />
            <span className="hidden md:inline">Kết nối</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 pt-24 lg:pt-32 pb-24 lg:pb-0">
        {/* Mobile Sections Slider - Fixed on Mobile */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar px-6 py-4 z-40 fixed top-[72px] left-0 bg-[#111111]/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex gap-8 min-w-max">
            {sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              return (
                <div 
                  key={section.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveSectionIndex(index)}
                >
                  <span className={`text-[clamp(0.6rem,1vw,0.7rem)] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? 'text-white border-b border-white pb-1' 
                      : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    {section.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col justify-center pl-8 relative z-20">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const isActive = index === activeSectionIndex;
              return (
                <div 
                  key={section.id}
                  className="flex items-center cursor-pointer group"
                  onClick={() => setActiveSectionIndex(index)}
                >
                  <div className={`h-[1px] bg-white/30 transition-all duration-300 mr-4 ${isActive ? 'w-0' : 'w-4 group-hover:w-6'}`} />
                  <span className={`text-[clamp(0.5rem,0.8vw,0.625rem)] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive 
                      ? 'text-white border border-white/30 px-3 py-1.5 rounded-sm bg-white/5' 
                      : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    {section.label}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center/Right Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-8 lg:pr-16 lg:pl-8 gap-12 lg:gap-0 pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSectionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-xl w-full pt-12 lg:pt-0"
            >
              <div className="flex items-center gap-2 text-white/50 font-serif italic text-[clamp(0.75rem,1.2vw,0.875rem)] mb-8">
                <span>{content.num}</span>
                <span>—</span>
                <span>{content.sectionName}</span>
              </div>

              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif text-white leading-[1.1] mb-8 whitespace-pre-line">
                {content.title}
              </h2>

              {content.subtitle && (
                <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-bold text-white/90 mb-6 whitespace-pre-line">
                  {content.subtitle}
                </h3>
              )}

              <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/50 leading-relaxed mb-8 whitespace-pre-line">
                {content.desc}
              </p>

              {content.list && (
                <ul className="space-y-3 mb-8">
                  {content.list.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[clamp(0.875rem,1.5vw,1rem)] text-white/70">
                      <span className="w-1 h-1 rounded-full bg-white/50 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button 
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-3 text-[clamp(0.65rem,1vw,0.75rem)] font-bold tracking-[0.2em] uppercase text-white hover:text-white/70 transition-colors group"
              >
                {content.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Right Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSectionId + '-img'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full lg:w-[500px] aspect-square lg:aspect-auto lg:h-[650px] rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[clamp(0.5rem,0.8vw,0.625rem)] font-bold tracking-widest uppercase text-white">Trải nghiệm trực tiếp</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <ServiceSwitcher />
      </main>

      {/* Footer - Fixed on Mobile */}
      <footer className="w-full flex justify-between items-center p-6 lg:p-8 z-40 fixed bottom-0 left-0 lg:relative bg-[#111111]/95 backdrop-blur-xl border-t border-white/10 lg:border-none lg:bg-transparent lg:mt-0">
        {/* <div className="flex flex-col gap-2 lg:gap-4">
          <div className="flex items-center gap-4 text-white/50">
            <Instagram size={16} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
          </div>
          <span className="text-[clamp(0.5rem,0.8vw,0.625rem)] font-bold tracking-widest uppercase text-white/30">
            © 2026 ART BRANDING STUDIO
          </span>
        </div> */}

        <div 
          className="flex flex-col items-end cursor-pointer group"
          onClick={handleNext}
        >
          <span className="text-[clamp(0.5rem,0.8vw,0.625rem)] font-bold tracking-widest uppercase text-white/30 mb-1 group-hover:text-white/50 transition-colors">
            Phần tiếp theo
          </span>
          <span className="text-[clamp(0.8rem,1.5vw,1rem)] font-serif italic text-white group-hover:text-white/80 transition-colors">
            {content.next}
          </span>
        </div>
      </footer>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
