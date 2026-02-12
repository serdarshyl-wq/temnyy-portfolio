import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const hoverTargetRef = useRef(null);
    const activeRectRef = useRef(null);

    const [hoverTarget, setHoverTarget] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const checkDevice = () => {
            const isTouchDevice =
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(hover: none)').matches;

            setIsMobile(isTouchDevice);
        };

        checkDevice();
        const mql = window.matchMedia('(hover: none)');
        if (mql.addEventListener) {
            mql.addEventListener('change', checkDevice);
        }

        return () => {
            if (mql.removeEventListener) {
                mql.removeEventListener('change', checkDevice);
            }
        };
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

        const moveCursor = (e) => {
            const target = hoverTargetRef.current;
            const isTextHover = target && target.getAttribute('data-cursor-text');

            if (target && activeRectRef.current && !isTextHover) {
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
            const target = e.target.closest('.clickable') || e.target.closest('a') || e.target.closest('button');
            if (target) {
                setHoverTarget(target);
                hoverTargetRef.current = target;
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('.clickable') || e.target.closest('a') || e.target.closest('button');
            if (target && target === hoverTargetRef.current) {
                if (!target.contains(e.relatedTarget)) {
                    setHoverTarget(null);
                    hoverTargetRef.current = null;
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
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        if (hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            const text = hoverTarget.getAttribute('data-cursor-text');
            activeRectRef.current = text ? null : rect;
            setCursorText(text || "");

            let targetRadius = "4px";
            if (hoverTarget.classList.contains('icon-github')) {
                targetRadius = "50%";
            } else if (hoverTarget.classList.contains('icon-linkedin') || hoverTarget.classList.contains('icon-instagram') || hoverTarget.classList.contains('social-icon')) {
                targetRadius = "10px";
            } else if (hoverTarget.classList.contains('circle-cursor')) {
                targetRadius = "50%";
            } else if (text) {
                targetRadius = "50%";
            }

            const isTextMode = !!text;
            const textWidth = 140;
            const textHeight = 40;

            gsap.to(cursorRef.current, {
                width: isTextMode ? textWidth : rect.width,
                height: isTextMode ? textHeight : rect.height,
                borderRadius: isTextMode ? "20px" : targetRadius,
                backgroundColor: isTextMode ? "#fff" : "#000",
                border: isTextMode ? "none" : "1px solid #fff",
                mixBlendMode: isTextMode ? "normal" : "difference",
                duration: 0.15,
                ease: "power2.out",
                overwrite: 'auto'
            });
        } else {
            activeRectRef.current = null;
            setCursorText("");

            gsap.to(cursorRef.current, {
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid #fff",
                clipPath: "inset(0 0% 0 0)",
                duration: 0.2,
                ease: "power2.out",
                overwrite: 'auto',
                mixBlendMode: "normal"
            });
        }
    }, [hoverTarget, isMobile]);

    if (isMobile) return null;

    return (
        <div ref={cursorRef} className={`custom-cursor ${cursorText ? 'has-text' : ''}`}>
            {cursorText && <span className="cursor-text-content">{cursorText}</span>}
        </div>
    );
};

export default CustomCursor;
