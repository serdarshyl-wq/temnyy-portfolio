import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './components/Intro/Intro';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import CustomScrollbar from './components/CustomScrollbar/CustomScrollbar';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [logoColor, setLogoColor] = useState('black');
  const [scrollLocked, setScrollLocked] = useState(true);
  const homeRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useEffect(() => {
  }, []);

  useLayoutEffect(() => {
    if (!introFinished || scrollLocked) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [scrollLocked, introFinished]);

  const handleNavClick = (section) => {
    if (homeRef.current) {
      homeRef.current.scrollTo(section);
    }
  };

  return (
    <>
      <CustomCursor />
      <CustomScrollbar lenis={lenisRef.current} visible={!scrollLocked} />
      <Navbar onNavClick={handleNavClick} logoColor={logoColor} />
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}
      <Home
        ref={homeRef}
        startAnim={introFinished}
        setNavbarColor={setLogoColor}
        setScrollLocked={setScrollLocked}
        lenis={lenisRef.current}
      />
    </>
  )
}

export default App
