import { useRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { FaChevronDown } from 'react-icons/fa';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import About from '../About/About';
import Work from '../Work/Work';
import Contact from '../Contact/Contact';
import HeroBackground from './HeroBackground';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = forwardRef(({ startAnim, setNavbarColor, setScrollLocked, lenis }, ref) => {
    const containerRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const heroBgRef = useRef(null);


    useImperativeHandle(ref, () => ({
        scrollTo: (section) => {
            console.log("Home received scrollTo request:", section);

            const targetId = section === 'home' ? '.hero-section' :
                section === 'about' ? '.about-section-wrapper' :
                    section === 'work' ? '.work-section' :
                        section === 'contact' ? '.contact-section' : null;

            if (targetId) {
                if (lenis) {
                    lenis.scrollTo(targetId, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                } else {
                    gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: "power2.inOut" });
                }
            }
        }
    }));


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(".distort-char", {
                y: -150,
                opacity: 0,
                filter: "blur(20px)",
                scale: 1.2
            });

            gsap.set(".hero-bg-text", {
                opacity: 0,
                y: -50,
                xPercent: -50,
                yPercent: -50,
                scaleX: 0.9,
                scaleY: window.innerWidth <= 768 ? 2.5 : 0.9
            });

            if (startAnim) {
                const masterTl = gsap.timeline({ delay: 0 });

                masterTl.to(".distort-char", {
                    duration: 1.8,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    stagger: { amount: 1, from: "start" },
                    ease: "power4.out",
                })
                    .to(".hero-bg-text", {
                        duration: 2,
                        opacity: 0.6,
                        y: 0,
                        scaleX: 1,
                        scaleY: window.innerWidth <= 768 ? 3 : 1,
                        ease: "power3.out"
                    }, "-=1.5")
                    .call(() => {
                        if (setScrollLocked) {
                            setScrollLocked(false);
                        }
                    });

                masterTl.add(() => {
                    const swapTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                    const c1 = ".c-1", c2 = ".c-2";
                    const t1 = ".t-1", t2 = ".t-2";
                    const v1 = ".v-1", v2 = ".v-2";
                    const o1 = ".o-1", o2 = ".o-2";
                    const d1 = ".d-1", d2 = ".d-2";
                    const p1 = ".p-1", p2 = ".p-2";


                    gsap.set(c2, { xPercent: -100 });
                    gsap.set(t2, { xPercent: -100 });
                    gsap.set(v2, { xPercent: 100 });
                    gsap.set(o2, { yPercent: -100 });
                    gsap.set(d2, { yPercent: -100 });
                    gsap.set(p2, { xPercent: 100 });

                    swapTl.addLabel("swap1", 0)
                        .to(c1, { xPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap1")
                        .to(c2, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap1")
                        .to(o1, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap1")
                        .to(o2, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap1")
                        .set(c1, { xPercent: 0 }).set(c2, { xPercent: -100 })
                        .set(o1, { yPercent: 0 }).set(o2, { yPercent: -100 });


                    swapTl.addLabel("swap2", 1)
                        .to(t1, { xPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap2")
                        .to(t2, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap2")
                        .to(d1, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap2")
                        .to(d2, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap2")
                        .set(t1, { xPercent: 0 }).set(t2, { xPercent: -100 })
                        .set(d1, { yPercent: 0 }).set(d2, { yPercent: -100 });

                    swapTl.addLabel("swap3", 2)
                        .to(v1, { xPercent: -100, duration: 0.8, ease: "power3.inOut" }, "swap3")
                        .to(v2, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap3")
                        .to(p1, { xPercent: -100, duration: 0.8, ease: "power3.inOut" }, "swap3")
                        .to(p2, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap3")
                        .set(v1, { xPercent: 0 }).set(v2, { xPercent: 100 })
                        .set(p1, { xPercent: 0 }).set(p2, { xPercent: 100 });
                });

            }

        }, containerRef);

        return () => ctx.revert();
    }, [startAnim]);

    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        if (!startAnim) return;

        let animating = false;
        let isLockedAtAbout = false;
        let touchStartY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleInteraction = (e) => {
            if (isLockedAtAbout || animating) {
                if (e.cancelable) e.preventDefault();
                return;
            }
            let deltaY = 0;
            if (e.type === 'wheel') {
                deltaY = e.deltaY;
            } else if (e.type === 'touchmove') {
                const touchCurrentY = e.touches[0].clientY;
                deltaY = touchStartY - touchCurrentY;
            }

            const currentScroll = window.scrollY;
            const vh = window.innerHeight;

            if (deltaY > 5 && currentScroll < vh - 50) {
                if (e.cancelable) e.preventDefault();

                animating = true;

                if (lenis) {
                    lenis.stop();
                    lenis.scrollTo('.about-section-wrapper', {
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        lock: true,
                        force: true,
                        onComplete: () => {
                            animating = false;
                            lenis.start();
                            isLockedAtAbout = true;
                            setTimeout(() => {
                                isLockedAtAbout = false;
                            }, 1000);
                        }
                    });
                } else {
                    gsap.to(window, {
                        scrollTo: '.about-section-wrapper',
                        duration: 1.5,
                        ease: "power2.inOut",
                        onComplete: () => {
                            animating = false;
                            isLockedAtAbout = true;
                            setTimeout(() => {
                                isLockedAtAbout = false;
                            }, 1000);
                        }
                    });
                }
            }
            else if (deltaY < -5 && currentScroll > 10 && currentScroll < vh + 100) {
                if (e.cancelable) e.preventDefault();

                animating = true;

                if (lenis) {
                    lenis.stop();
                    lenis.scrollTo(0, {
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        lock: true,
                        force: true,
                        onComplete: () => {
                            animating = false;
                            lenis.start();
                        }
                    });
                } else {
                    gsap.to(window, {
                        scrollTo: 0,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onComplete: () => {
                            animating = false;
                        }
                    });
                }
            }
        };

        window.addEventListener('wheel', handleInteraction, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleInteraction, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleInteraction);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleInteraction);
        };

    }, [startAnim, lenis]);

    return (
        <div className="home-container" ref={containerRef}>

            <div className="hero-section">
                <HeroBackground ref={heroBgRef} />

                <div className="hero-bg-text">TEMNYY</div>

                <div className="hero-top">

                    <div className="hero-text-row creative-row">
                        <div className="swapping-c-container">
                            <span className="distort-char c-1">C</span>
                            <span className="distort-char c-2">C</span>
                        </div>
                        {['R', 'E', 'A'].map((char, i) => (
                            <span key={`rea-${i}`} className="distort-char">{char}</span>
                        ))}
                        <div className="swapping-c-container swap-t">
                            <span className="distort-char t-1">T</span>
                            <span className="distort-char t-2">T</span>
                        </div>
                        {['I'].map((char, i) => (
                            <span key={`i-${i}`} className="distort-char">{char}</span>
                        ))}
                        <div className="swapping-c-container swap-v">
                            <span className="distort-char v-1">V</span>
                            <span className="distort-char v-2">V</span>
                        </div>
                        {['E'].map((char, i) => (
                            <span key={`e-${i}`} className="distort-char">{char}</span>
                        ))}
                    </div>

                    <div className="hero-text-row role-row">


                        <div className="front-end-group">
                            <div className="word-wrapper">
                                {['F', 'R'].map((char, i) => (
                                    <span key={`fr-${i}`} className="distort-char w-fe">{char}</span>
                                ))}
                                <div className="swapping-c-container swap-o">
                                    <span className="distort-char o-1 w-fe">O</span>
                                    <span className="distort-char o-2 w-fe">O</span>
                                </div>
                                {['N', 'T'].map((char, i) => (
                                    <span key={`nt-${i}`} className="distort-char w-fe">{char}</span>
                                ))}
                            </div>

                            <div className="word-wrapper">
                                {['E', 'N'].map((char, i) => (
                                    <span key={`en-${i}`} className="distort-char w-fe">{char}</span>
                                ))}
                                <div className="swapping-c-container swap-d">
                                    <span className="distort-char d-1 w-fe">D</span>
                                    <span className="distort-char d-2 w-fe">D</span>
                                </div>
                            </div>
                        </div>

                        <div className="word-wrapper">
                            {['D', 'E', 'V', 'E', 'L', 'O'].map((char, i) => (
                                <span key={`devel-${i}`} className="distort-char w-dev">{char}</span>
                            ))}
                            <div className="swapping-c-container swap-p">
                                <span className="distort-char p-1 w-dev">P</span>
                                <span className="distort-char p-2 w-dev">P</span>
                            </div>
                            {['E', 'R'].map((char, i) => (
                                <span key={`er-${i}`} className="distort-char w-dev">{char}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <span>SCROLL</span>
                    <FaChevronDown className="scroll-icon" />
                </div>
            </div>


            <div className="about-section-wrapper" ref={aboutRef}>
                <About />
            </div>


            <div className="work-container-wrapper" ref={workRef}>
                <Work ref={workRef} setScrollLocked={setScrollLocked} />
            </div>


            <Contact />
        </div>
    );
});

export default Home;