import { useState, useEffect, useRef } from 'react';
import Intro from './components/Intro/Intro';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [logoColor, setLogoColor] = useState('black');
  const [scrollLocked, setScrollLocked] = useState(false);
  const homeRef = useRef(null);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : '';
  }, [scrollLocked]);

  const handleNavClick = (section) => {
    if (homeRef.current) {
      homeRef.current.scrollTo(section);
    }
  };

  return (
    <>
      <CustomCursor />
      <Navbar onNavClick={handleNavClick} logoColor={logoColor} />
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}
      <Home
        ref={homeRef}
        startAnim={introFinished}
        setNavbarColor={setLogoColor}
        setScrollLocked={setScrollLocked}
      />
    </>
  )
}

export default App
