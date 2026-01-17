import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Intro.css';

const Intro = ({ onComplete }) => {
    const mainTextRef = useRef(null);
    const subTextWrapperRef = useRef(null);


    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();


            tl.fromTo(".main-text .char",
                { y: 150, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power4.out"
                }
            );


            tl.fromTo(".sub-text .char",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "power3.out"
                },
                "+=0.1"
            );


            tl.to(mainTextRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                delay: 0.2,
                onComplete: () => {
                    setTimeout(() => {
                        onComplete();
                    }, 0);
                }
            });

        }, mainTextRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className="intro-container" ref={mainTextRef}>
            <div className="content-wrapper">

                <div className="main-text-container">
                    <div className="main-text">
                        {splitText("TEMNYY")}
                    </div>
                </div>


                <div className="sub-text-column" ref={subTextWrapperRef}>
                    <div className="sub-text-line">
                        <div className="sub-text front">
                            {splitText("FRONT")}
                        </div>
                    </div>
                    <div className="sub-text-line">
                        <div className="sub-text end">
                            {splitText("END")}
                        </div>
                    </div>
                    <div className="sub-text-line">
                        <div className="sub-text developer">
                            {splitText("DEVELOPER")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
