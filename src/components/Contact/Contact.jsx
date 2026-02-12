import React, { useLayoutEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../Shared/SectionBackground';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const text = "CONTACT";

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const chars = titleRef.current.querySelectorAll('.contact-char');

            gsap.fromTo(chars,
                {
                    x: "-100vw", // Start off-screen left
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom", // Start when top of section hits bottom of viewport
                        end: "center center", // End when center of section hits center of viewport
                        scrub: 1 // Smooth scrubbing
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="contact-section" ref={sectionRef}>
            <SectionBackground />
            <div className="contact-text-container">
                <h1 className="contact-title" ref={titleRef}>
                    {text.split("").map((char, i) => (
                        <span key={i} className="contact-char" style={{ display: 'inline-block' }}>{char}</span>
                    ))}
                </h1>
                <div className="contact-details">
                    <a href="mailto:contact@temnyy.dev" className="email-link">contact@temnyy.dev</a>
                </div>

                <div className="contact-socials">
                    <a href="https://www.linkedin.com/in/serdar-s%C3%BCheyl-yildiz-215829385/" target="_blank" rel="noopener noreferrer" className="social-icon icon-linkedin">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/serdarshyl-wq" target="_blank" rel="noopener noreferrer" className="social-icon icon-github">
                        <FaGithub />
                    </a>
                    <a href="https://www.instagram.com/serdar.shyl.yildiz/" target="_blank" rel="noopener noreferrer" className="social-icon icon-instagram">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
