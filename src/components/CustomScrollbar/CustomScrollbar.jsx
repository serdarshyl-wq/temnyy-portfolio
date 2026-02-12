import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomScrollbar.css';

const CustomScrollbar = ({ lenis, visible }) => {
    const thumbRef = useRef(null);
    const trackRef = useRef(null);
    const [thumbHeight, setThumbHeight] = useState(0);

    useEffect(() => {
        if (!lenis) return;

        const updateHeight = () => {
            const { limit } = lenis;
            const viewportHeight = window.innerHeight;
            const contentHeight = limit + viewportHeight;

            const ratio = viewportHeight / contentHeight;
            const height = Math.max(ratio * viewportHeight, 50);
            setThumbHeight(height);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, [lenis]);
    useEffect(() => {
        if (!lenis || !thumbRef.current) return;

        const handleScroll = ({ scroll, limit }) => {
            const viewportHeight = window.innerHeight;
            const progress = scroll / limit;
            const trackHeight = viewportHeight;
            const availableSpace = trackHeight - thumbHeight;

            const thumbY = progress * availableSpace;

            gsap.set(thumbRef.current, { y: thumbY });
        };

        lenis.on('scroll', handleScroll);

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis, thumbHeight]);

    useEffect(() => {
        if (!trackRef.current) return;

        if (visible) {
            gsap.to(trackRef.current, {
                x: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });
        } else {
            gsap.to(trackRef.current, {
                x: 20,
                duration: 0.5,
                ease: "power3.in"
            });
        }
    }, [visible]);

    return (
        <div className="custom-scrollbar-track" ref={trackRef}>
            <div
                className="custom-scrollbar-thumb"
                ref={thumbRef}
                style={{ height: thumbHeight }}
            />
        </div>
    );
};

export default CustomScrollbar;
