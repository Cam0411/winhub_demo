import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ArtBranding from './pages/ArtBranding';
import ConversionPerformance from './pages/ConversionPerformance';
import SalesCreator from './pages/SalesCreator';
import PersonalBranding from './pages/PersonalBranding';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();

  const hideAudio = location.pathname === "/art-branding";

  return (
    <div className="bg-[#0a0f1c] min-h-screen relative">
      <ScrollToTop />
      <Loader />

      {!hideAudio && <GlobalAudioPlayer />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art-branding" element={<ArtBranding />} />
        <Route path="/conversion-performance" element={<ConversionPerformance />} />
        <Route path="/sales-creator" element={<SalesCreator />} />
        <Route path="/personal-branding" element={<PersonalBranding />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}