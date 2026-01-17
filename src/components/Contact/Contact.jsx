import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ timeline }) => {

    useEffect(() => {
        if (!timeline) return;




        const overlapTiming = "-=70";


        timeline.set(".contact-char", { x: "-150vw", opacity: 1 }, overlapTiming);
        timeline.set(".contact-section", { autoAlpha: 1 }, overlapTiming);




        timeline.to(".contact-char", {
            x: 0,
            duration: 120,
            ease: "power2.out",
            stagger: 2
        }, overlapTiming);


        timeline.fromTo([".contact-details", ".contact-socials"],
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 40, ease: "power2.out" },
            "-=20"
        );


        timeline.addLabel("contact");

        ScrollTrigger.refresh();

    }, [timeline]);


    const text = "CONTACT";

    return (
        <div className="contact-section">
            <div className="contact-bg"></div>
            <div className="contact-text-container">
                <h1 className="contact-title">
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
