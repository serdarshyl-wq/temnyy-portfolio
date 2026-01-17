import React from 'react';
import gsap from 'gsap';
import './Work.css';

const Work = () => {

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
            const o1 = ".work-o-1";
            const o2 = ".work-o-2";
            gsap.set(o1, { yPercent: 0 });
            gsap.set(o2, { yPercent: -100 });
            tl.to(o1, { yPercent: 100, duration: 0.6, ease: "power2.inOut" })
                .to(o2, { yPercent: 0, duration: 0.6, ease: "power2.inOut" }, "<")
                .set(o1, { yPercent: 0 })
                .set(o2, { yPercent: -100 });

        }, ".work-section");

        return () => ctx.revert();
    }, []);

    return (
        <div className="work-section">

            <div className="work-static-dots"></div>
            <div className="work-rows-container">
                <div className="work-char-row row-w">
                    {Array(60).fill("W").map((char, i) => (
                        <span key={i} className={`work-char char-${i}`}>{char}</span>
                    ))}
                </div>
                <div className="work-char-row row-o">
                    {Array(60).fill("O").map((char, i) => (
                        <span key={i} className={`work-char char-${i}`}>{char}</span>
                    ))}
                </div>
                <div className="work-char-row row-r">
                    {Array(60).fill("R").map((char, i) => (
                        <span key={i} className={`work-char char-${i}`}>{char}</span>
                    ))}
                </div>
                <div className="work-char-row row-k">
                    {Array(60).fill("K").map((char, i) => (
                        <span key={i} className={`work-char char-${i}`}>{char}</span>
                    ))}
                </div>
            </div>
            <div className="work-projects-track">
                {[{ id: 1, image: "/project-1.png", link: "https://avsarmadensuyu.vercel.app/" }, { id: 2 }, { id: 3 }, { id: 4 }].map((project) => (
                    <div key={project.id} className="monitor-card">
                        <div className="monitor-frame">
                            <div className="monitor-screen">
                                {project.image ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <img src={project.image} alt={`Project ${project.id}`} className="project-image" />
                                    </a>
                                ) : (
                                    <div className="coming-soon-wrapper">
                                        <div className="coming-row">
                                            <span>C</span>
                                            <div className="work-swap-container">
                                                <span className="work-o-1">O</span>
                                                <span className="work-o-2">O</span>
                                            </div>
                                            <span>M</span><span>I</span><span>N</span><span>G</span>
                                        </div>
                                        <div className="soon-row">
                                            <span>S</span>
                                            <div className="work-swap-container">
                                                <span className="work-o-1">O</span>
                                                <span className="work-o-2">O</span>
                                            </div>
                                            <div className="work-swap-container">
                                                <span className="work-o-1">O</span>
                                                <span className="work-o-2">O</span>
                                            </div>
                                            <span>N</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const initWorkAnimation = (tl, setNavbarColor) => {
    const workSection = document.querySelector(".work-section");
    if (!workSection || !tl) return;
    tl.to(workSection, {
        yPercent: 0,
        duration: 40,
        ease: "power4.out",
        onStart: () => setNavbarColor && setNavbarColor('white'),
        onReverseComplete: () => setNavbarColor && setNavbarColor('black')
    }, "-=20")
        .addLabel("work");
    tl.to(".work-char", {
        autoAlpha: 1,
        rotationY: (i) => {
            const rowSize = 60;
            const indexInRow = i % rowSize;
            const centerIndex = 30;
            const offset = indexInRow - centerIndex;
            return offset * 10;
        },
        duration: 50,
        ease: "power2.inOut"
    }, "+=5");

    tl.to(".row-w", { rotationY: -45, duration: 150, ease: "none" }, "+=0.1");
    tl.to(".row-o", { rotationY: -25, duration: 150, ease: "none" }, "<");
    tl.to(".row-r", { rotationY: -55, duration: 150, ease: "none" }, "<");
    tl.to(".row-k", { rotationY: -35, duration: 150, ease: "none" }, "<");
    tl.to(".work-projects-track", {
        x: "-350vw",
        duration: 150,
        ease: "none"
    }, "<");

    tl.to(".work-char", {
        rotationY: 0,
        autoAlpha: 0,
        duration: 50,
        ease: "power2.inOut"
    }, "-=40");

    tl.to(".work-rows-container", {
        xPercent: 100,
        autoAlpha: 0,
        duration: 60,
        ease: "power2.in"
    }, "-=30");


    tl.to(".work-projects-track", {
        autoAlpha: 0,
        duration: 60,
        ease: "power2.in"
    }, "<");
};

export default Work;

