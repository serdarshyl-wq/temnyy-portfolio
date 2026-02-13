import React, { forwardRef } from 'react';
import SectionBackground from '../Shared/SectionBackground';
import './Work.css';

const Work = forwardRef((props, ref) => {
    const [hoveredProject, setHoveredProject] = React.useState(null);
    const containerRef = React.useRef(null);

    React.useImperativeHandle(ref, () => containerRef.current);

    const handleMouseEnter = (projectId) => {
        if (window.innerWidth <= 1024) return;
        setHoveredProject(projectId);
    };

    const handleMouseLeave = () => {
        if (window.innerWidth <= 1024) return;
        setHoveredProject(null);
    };

    const handleClick = (e, projectId) => {
        if (window.innerWidth > 1024) return;
        if (hoveredProject !== projectId) {
            e.preventDefault();
            setHoveredProject(projectId);
        }
    };

    React.useEffect(() => {
        if (!containerRef.current) return;
        const videos = containerRef.current.querySelectorAll('video');

        videos.forEach(video => {
            const container = video.closest('.project-video-container');
            if (container && container.classList.contains('active')) {
                video.load();
                video.play().catch(err => console.log("Video play interrupted", err));
            } else {
                video.pause();
            }
        });
    }, [hoveredProject]);

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (window.innerWidth <= 1024 && hoveredProject) {
                if (!e.target.closest('.project-item')) {
                    setHoveredProject(null);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [hoveredProject]);

    return (
        <section className="work-section" ref={containerRef}>
            <SectionBackground />
            <div className="work-split-container">
                <div className="work-left">
                    <h2 className="work-title">SECTIONS</h2>

                    <div className="project-list">
                        <div className="work-separator"></div>

                        <div
                            className="project-item clickable"
                            onMouseEnter={() => handleMouseEnter('nike')}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => handleClick(e, 'nike')}
                            data-cursor-text="VIEW"
                        >
                            <span className="project-name">Nike Intro-Hero Section</span>
                            <div className={`project-video-container ${hoveredProject === 'nike' ? 'active' : ''}`}>
                                <video
                                    src="/nike-intro-hero.mp4"
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    className="project-video nike-video"
                                />
                            </div>
                        </div>

                        <div className="work-separator"></div>
                    </div>
                </div>
                <div className="work-right">
                    <h2 className="work-title">WEBSITES</h2>

                    <div className="project-list">
                        <div className="work-separator"></div>

                        <a
                            href="https://avsarmadensuyu.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-item clickable"
                            onMouseEnter={() => handleMouseEnter('avsar')}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => handleClick(e, 'avsar')}
                            data-cursor-text="VIEW WEBSITE"
                        >
                            <span className="project-name">Avşar Mineral Water</span>
                            <div className={`project-video-container ${hoveredProject === 'avsar' ? 'active' : ''}`}>
                                <video
                                    src="/avşar-maden-suyu.mp4"
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    className="project-video"
                                />
                            </div>
                        </a>

                        <div className="work-separator"></div>

                        <a
                            href="https://bbl-shop.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-item clickable"
                            onMouseEnter={() => handleMouseEnter('bbl')}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => handleClick(e, 'bbl')}
                            data-cursor-text="VIEW WEBSITE"
                        >
                            <span className="project-name">BBL SHOP</span>
                            <div className={`project-video-container ${hoveredProject === 'bbl' ? 'active' : ''}`}>
                                <video
                                    src="/bbl-shop.mp4"
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    className="project-video"
                                />
                            </div>
                        </a>

                        <div className="work-separator"></div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Work;
