import React, { useLayoutEffect, useRef } from 'react';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiGreensock } from 'react-icons/si';
import gsap from 'gsap';
import './About.css';

const About = () => {
    const containerRef = useRef(null);
    const icons = [
        { Icon: SiHtml5, name: 'HTML5' },
        { Icon: SiCss3, name: 'CSS3' },
        { Icon: SiJavascript, name: 'JavaScript' },
        { Icon: SiReact, name: 'React' },
        { Icon: SiGreensock, name: 'GSAP' }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
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
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="about-container" ref={containerRef}>

            <h2 className="about-title">
                <div className="swapping-c-container">
                    <span className="distort-char a-1">A</span>
                    <span className="distort-char a-2">A</span>
                </div>
                <span className="distort-char">B</span>
                <div className="swapping-c-container">
                    <span className="distort-char o-1">O</span>
                    <span className="distort-char o-2">O</span>
                </div>
                <span className="distort-char">U</span>
                <span className="distort-char">T</span>
                <span className="spacer"></span>
                <span className="distort-char">M</span>
                <div className="swapping-c-container">
                    <span className="distort-char e-1">E</span>
                    <span className="distort-char e-2">E</span>
                </div>
            </h2>

            <div className="about-content-row">

                <div className="about-text-content">
                    <p className="about-description">
                        Hey! I'm Serdar Süheyl, a junior frontend developer based in Denizli, Türkiye. I'm passionate about creating
                        engaging and user-friendly websites. I'm always learning new technologies and techniques to improve my skills.
                        <br /> <br />
                        Currently, I'm focusing on React and GSAP, working on adding life to static pages through animations.
                    </p>
                </div>


                <div className="about-image-col">
                    <img src="/profile.jpeg" alt="Profile" className="profile-image" />
                </div>
            </div>


            <div className="marquee-wrapper">
                <div className="icon-track">
                    {[...icons, ...icons, ...icons].map((iconObj, i) => {
                        const Icon = iconObj.Icon;
                        return (
                            <div key={i} className="icon-item">
                                <Icon className="skill-icon" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default React.memo(About);
