import React from 'react';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiGreensock } from 'react-icons/si';
import './About.css';

const About = () => {
    const icons = [
        { Icon: SiHtml5, name: 'HTML5' },
        { Icon: SiCss3, name: 'CSS3' },
        { Icon: SiJavascript, name: 'JavaScript' },
        { Icon: SiReact, name: 'React' },
        { Icon: SiGreensock, name: 'GSAP' }
    ];

    return (
        <div className="about-container">

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

export default About;
