import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [hoverTarget, setHoverTarget] = useState(null);
    const hoverTargetRef = useRef(null);
    const activeRectRef = useRef(null);

    useEffect(() => {
        hoverTargetRef.current = hoverTarget;
    }, [hoverTarget]);

    useEffect(() => {

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

        const moveCursor = (e) => {
            if (hoverTargetRef.current && activeRectRef.current) {

                const rect = activeRectRef.current;
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;


                const magneticX = centerX + (e.clientX - centerX) * 0.2;
                const magneticY = centerY + (e.clientY - centerY) * 0.2;

                xTo(magneticX);
                yTo(magneticY);
            } else {
                xTo(e.clientX);
                yTo(e.clientY);
            }
        };

        const handleMouseOver = (e) => {

            const target = e.target.closest('.clickable') ||
                e.target.closest('a') ||
                e.target.closest('button');
            if (target) {
                setHoverTarget(target);
            }
        };

        const handleMouseOut = (e) => {


            const target = e.target.closest('.clickable') ||
                e.target.closest('a') ||
                e.target.closest('button');

            if (target && target === hoverTargetRef.current) {

                if (!target.contains(e.relatedTarget)) {
                    setHoverTarget(null);
                }
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);


    useEffect(() => {
        if (hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            activeRectRef.current = rect;


            let targetRadius = "4px";

            if (hoverTarget.classList.contains('icon-github')) {

                targetRadius = "50%";
            } else if (hoverTarget.classList.contains('icon-linkedin')) {

                targetRadius = "0px";
            } else if (hoverTarget.classList.contains('icon-instagram')) {

                targetRadius = "20px";
            } else if (hoverTarget.classList.contains('social-icon') || hoverTarget.classList.contains('circle-cursor')) {

                targetRadius = "50%";
            }


            gsap.to(cursorRef.current, {
                width: rect.width,
                height: rect.height,
                borderRadius: targetRadius,
                backgroundColor: "#000",
                border: "1px solid #fff",
                duration: 0.2,
                ease: "power2.out",
                overwrite: 'auto'
            });


            gsap.fromTo(cursorRef.current,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 0.3, ease: "power2.out" }
            );

        } else {
            activeRectRef.current = null;



            gsap.to(cursorRef.current, {
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid #fff",
                clipPath: "inset(0 0% 0 0)",
                duration: 0.2,
                ease: "power2.out",
                overwrite: 'auto'
            });
        }
    }, [hoverTarget]);

    return (
        <div ref={cursorRef} className="custom-cursor"></div>
    );
};

export default CustomCursor;
