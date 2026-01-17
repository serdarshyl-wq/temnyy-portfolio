import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import About from '../About/About';
import Work, { initWorkAnimation } from '../Work/Work';
import Contact from '../Contact/Contact';
import './Home.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = forwardRef(({ startAnim, setNavbarColor, setScrollLocked }, ref) => {
    const [scrollTimeline, setScrollTimeline] = useState(null);
    const containerRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);


    useImperativeHandle(ref, () => ({
        scrollTo: (section) => {
            console.log("Home received scrollTo request:", section);

            if (section === 'home') {
                console.log("Scrolling to Top");
                gsap.to(window, { scrollTo: 0, duration: 2, ease: "power2.inOut" });
                return;
            }

            if (!scrollTimeline) {
                console.warn("ScrollTimeline not ready yet");
                return;
            }


            const st = scrollTimeline.scrollTrigger;
            if (st) {

                const labelTime = scrollTimeline.labels[section];
                if (labelTime !== undefined) {
                    const targetPos = st.labelToScroll(section);
                    console.log("Target Label:", section, "Calculated Pos:", targetPos);

                    if (targetPos !== null && targetPos !== undefined) {
                        gsap.to(window, {
                            scrollTo: targetPos,
                            duration: 2.5,
                            ease: "power2.inOut"
                        });
                    }
                } else {
                    console.error("Label not found in timeline:", section);
                }
            } else {
                console.error("ScrollTrigger instance not found on timeline");
            }
        }
    }));


    useEffect(() => {
        if (!startAnim) {
            gsap.set(".distort-char", { opacity: 0 });
            return;
        }

        if (setScrollLocked) {
            setScrollLocked(true);
        }

        let ctx = gsap.context(() => {

            gsap.set(".bg-left", { left: "100%", width: "50%" });
            gsap.set(".bg-right", { right: 0, width: "50%" });


            gsap.set(".distort-char", {
                y: -150,
                opacity: 0,
                filter: "blur(20px)",
                scale: 1.2
            });


            const workSection = document.querySelector('.work-section');
            if (workSection) {
                gsap.set(workSection, { yPercent: -100, autoAlpha: 1 });
            }


            const aboutContainer = document.querySelector('.about-container');
            if (aboutContainer) {
                gsap.set(aboutContainer, { yPercent: -100, autoAlpha: 1 });
            }

            const masterTl = gsap.timeline({ delay: 0 });


            masterTl.to(".bg-left", {
                keyframes: {
                    "0%": { left: "100%" },
                    "35%": { left: "55%", ease: "power2.in" },
                    "65%": { left: "45%", ease: "linear" },
                    "100%": { left: "0%", ease: "power2.out" }
                },
                duration: 2.2
            }, "wipe");


            masterTl.to(".distort-char", {
                duration: 1.8,
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                stagger: { amount: 1, from: "start" },
                ease: "power4.out",
                onComplete: () => {
                    ScrollTrigger.refresh();
                    if (setScrollLocked) {
                        setScrollLocked(false);
                    }
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


            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=25000",
                    scrub: 1.5,
                    pin: true,
                }
            });


            scrollTl.to(".hero-text-row", {
                y: -150,
                opacity: 0,
                filter: "blur(20px)",
                scale: 1.1,
                stagger: 0.1,
                ease: "power2.in",
                duration: 25
            });


            const profileImg = document.querySelector(".profile-image");
            const aboutText = document.querySelector(".about-text-content");
            const marqueeWrapper = document.querySelector(".marquee-wrapper");


            const realAboutContainer = document.querySelector(".about-container");
            if (realAboutContainer) {
                scrollTl.to(realAboutContainer, {
                    yPercent: 0,
                    duration: 25,
                    ease: "power2.inOut"
                }, "-=15");


                scrollTl.addLabel("about");
            }


            if (document.querySelector(".about-title")) {
                scrollTl.to(".about-title", {
                    duration: 20,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    ease: "power4.out"
                }, "-=10");
            }


            scrollTl.add(() => {
                const aboutSwapTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                const a1 = ".a-1", a2 = ".a-2";
                const o1 = ".o-1", o2 = ".o-2";
                const e1 = ".e-1", e2 = ".e-2";


                gsap.set(a2, { xPercent: -100 });
                gsap.set(o2, { yPercent: -100 });
                gsap.set(e2, { yPercent: 100 });


                aboutSwapTl.addLabel("swap1", 0)
                    .to(a1, { xPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap1")
                    .to(a2, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap1")
                    .to(o1, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, "swap1")
                    .to(o2, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap1")
                    .set(a1, { xPercent: 0 }).set(a2, { xPercent: -100 })
                    .set(o1, { yPercent: 0 }).set(o2, { yPercent: -100 });


                aboutSwapTl.addLabel("swap2", 1)
                    .to(e1, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "swap2")
                    .to(e2, { yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "swap2")
                    .set(e1, { yPercent: 0 }).set(e2, { yPercent: 100 });
            }, "-=0");


            if (profileImg && aboutText) {
                scrollTl.fromTo([profileImg, aboutText],
                    { y: -150, opacity: 0, filter: "blur(20px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 25, ease: "power2.out" },
                    "-=10"
                );
            }


            if (marqueeWrapper) {
                scrollTl.fromTo(marqueeWrapper,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 25, ease: "power2.out" },
                    "-=10"
                );
            }


            scrollTl.to([".about-title", ".about-content-row", ".marquee-wrapper"], {
                y: -150,
                autoAlpha: 0,
                duration: 60
            });


            initWorkAnimation(scrollTl, setNavbarColor);


            setScrollTimeline(scrollTl);

        }, containerRef);
        return () => ctx.revert();
    }, [startAnim]);



    return (
        <div className="home-container" ref={containerRef}>

            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>

            <div className="sticky-bg-container">
                <div className="bg-panel bg-left"></div>
                <div className="bg-panel bg-right"></div>
                <div className="fluid-blob blob-white"></div>
                <div className="fluid-blob blob-black"></div>
            </div>

            <div className="hero-section">

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
                        {['F', 'R'].map((char, i) => (
                            <span key={`fr-${i}`} className="distort-char w-fe">{char}</span>
                        ))}
                        <div className="swapping-c-container swap-o">
                            <span className="distort-char o-1 w-fe">O</span>
                            <span className="distort-char o-2 w-fe">O</span>
                        </div>
                        {['N', 'T', '-', 'E', 'N'].map((char, i) => (
                            <span key={`nten-${i}`} className="distort-char w-fe">{char}</span>
                        ))}
                        <div className="swapping-c-container swap-d">
                            <span className="distort-char d-1 w-fe">D</span>
                            <span className="distort-char d-2 w-fe">D</span>
                        </div>
                        <span className="spacer"></span>
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


            <div className="about-section-wrapper" ref={aboutRef}>
                <About />
            </div>


            <div className="work-container-wrapper" ref={workRef}>
                <Work />
            </div>


            <Contact timeline={scrollTimeline} />
        </div>
    );
});

export default Home;