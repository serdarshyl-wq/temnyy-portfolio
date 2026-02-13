import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroBackground.css';

gsap.registerPlugin(ScrollTrigger);

const HeroBackground = forwardRef((props, ref) => {
    const containerRef = useRef(null);
    const blobRefs = useRef([]);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const blobs = blobRefs.current.filter(Boolean);

            gsap.set(blobs, {
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            tl.to(blobs, {
                duration: 0.8,
                scale: 0.4,
                opacity: 0.4,
                ease: "power2.out",
                stagger: { amount: 0.2, from: "center" }
            })
                .to(blobs, {
                    duration: 1.5,
                    ease: "power2.inOut",
                    x: (i) => {
                        const targetIdx = i % 4;
                        const isLeft = targetIdx === 0 || targetIdx === 1;
                        const isConnector = i >= 4;
                        const spread = isConnector ? 15 : 30;
                        return (isLeft ? -1 : 1) * spread + "vw";
                    },
                    y: (i) => {
                        const targetIdx = i % 4;
                        const isTop = targetIdx === 0 || targetIdx === 2;
                        const isConnector = i >= 4;
                        const spread = isConnector ? 15 : 30;
                        return (isTop ? -1 : 1) * spread + "vh";
                    },
                    scale: (i) => i < 4 ? 1.2 : 0.8,
                    opacity: 0.5
                })
                .to(blobs, {
                    duration: 3,
                    ease: "power3.inOut",
                    x: (i) => {
                        const targetIdx = i % 4;
                        const isLeft = targetIdx === 0 || targetIdx === 1;
                        const isConnector = i >= 4;
                        const spread = isConnector ? 25 : 48;
                        return (isLeft ? -1 : 1) * spread + "vw";
                    },
                    y: (i) => {
                        const targetIdx = i % 4;
                        const isTop = targetIdx === 0 || targetIdx === 2;
                        const isConnector = i >= 4;
                        const spread = isConnector ? 25 : 48;
                        return (isTop ? -1 : 1) * spread + "vh";
                    },
                    scale: (i) => i < 4 ? 1.6 : 1.1,
                    opacity: 0.3
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="hero-background" ref={containerRef}>
            <div className="blobs-container">
                <div ref={el => blobRefs.current[0] = el} className="blob blob-turquoise z-10"></div>
                <div ref={el => blobRefs.current[1] = el} className="blob blob-green z-10"></div>
                <div ref={el => blobRefs.current[2] = el} className="blob blob-turquoise z-10"></div>
                <div ref={el => blobRefs.current[3] = el} className="blob blob-green z-10"></div>
                {!isMobile && (
                    <>
                        <div ref={el => blobRefs.current[4] = el} className="blob blob-turquoise z-0 opacity-80"></div>
                        <div ref={el => blobRefs.current[5] = el} className="blob blob-green z-0 opacity-80"></div>
                        <div ref={el => blobRefs.current[6] = el} className="blob blob-turquoise z-0 opacity-80"></div>
                        <div ref={el => blobRefs.current[7] = el} className="blob blob-green z-0 opacity-80"></div>
                    </>
                )}
            </div>
        </div>
    );
});

export default React.memo(HeroBackground);
