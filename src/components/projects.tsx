import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import Masonry from 'react-masonry-css';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Link from 'next/link';
import { Project } from '@/app/abstract/interface';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
            }}
        >
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white flex items-center">
                    <span className="mr-2">{getProjectIcon(project.type)}</span>
                    {project.name}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold mb-2 text-teal-300">Technologies:</h4>
                        <div className="flex flex-wrap mb-4">
                            {project.languages.map((tech, index) => (
                                <span key={index} className="bg-gray-700 text-teal-300 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="flex flex-wrap justify-between items-center mt-4">
                    <ProjectButton
                        href={project.html_url}
                        icon={<FaGithub className="mr-2" />}
                        text="GitHub"
                        ariaLabel={`View ${project.name} on GitHub`}
                    />
                    {project.homepage && (
                        <ProjectButton
                            href={project.homepage}
                            icon={<FaExternalLinkAlt className="mr-2" />}
                            text="Live Demo"
                            ariaLabel={`View live demo of ${project.name}`}
                        />
                    )}
                    <ProjectButton
                        href={`/projects/${project.name}`}
                        icon={<FaInfoCircle className="mr-2" />}
                        text="Learn More"
                        ariaLabel={`Learn more about ${project.name}`}
                    />
                </div>
            </div>
            <ProjectModal project={project} isOpen={showModal} onClose={() => setShowModal(false)} />
        </motion.div>
    );
};

const ProjectButton: React.FC<{ href?: string; onClick?: () => void; icon: React.ReactNode; text: string; ariaLabel: string }> = ({ href, onClick, icon, text, ariaLabel }) => {
    const baseClasses = "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-md flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    const hoverClasses = "hover:from-blue-600 hover:to-purple-700 hover:shadow-lg";

    if (href) {
        return (
            <Link href={href}>
                <span className={`${baseClasses} ${hoverClasses}`} aria-label={ariaLabel}>
                    {icon} {text}
                </span>
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${hoverClasses}`}
            aria-label={ariaLabel}
        >
            {icon} {text}
        </button>
    );
};


const ProjectModal: React.FC<{ project: Project; isOpen: boolean; onClose: () => void }> = ({ project, isOpen, onClose }) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="flex items-center justify-center p-0">
                <div className="relative bg-gray-800 rounded-lg w-full p-6 z-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold mb-4 text-white">{project.name.replaceAll('-', ' ')}</DialogTitle>
                        <DialogDescription className="text-gray-300 mb-4">{project.description}</DialogDescription>
                    </DialogHeader>

                    <h4 className="mt-2 text-lg font-semibold mb-2 text-teal-300">My Role:</h4>
                    <p className="text-gray-300 mb-4">{project.role}</p>

                    <button
                        onClick={onClose}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mt-4 hover:from-blue-600 hover:to-purple-700"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};



const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                const enhancedData = data.map((project: any, index: number) => ({
                    ...project,
                    name: project.name.replaceAll('-', ' ').split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                    type: getProjectTypeBasedOnLanguages(project.languages),
                    role: "Lead Developer",
                }));
                setProjects(enhancedData);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to load projects. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects;

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    };

    if (isLoading) {
        return <div className="text-center py-20">Loading projects...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-400">{error}</div>;
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <motion.h2
                className="text-4xl sm:text-6xl font-extrabold mb-5 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r to-purple-600 from-blue-500"
                style={{
                    WebkitBackgroundClip: "text",
                    MozBackgroundClip: "text",
                    backgroundClip: "text",
                    fontFamily: "'Poppins', sans-serif",
                }}
                variants={itemVariants}
            >
                Projects
            </motion.h2>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </Masonry>
        </motion.div>
    );
};

const getProjectIcon = (type: string) => {
    switch (type) {
        case 'Web App':
            return '🌏';
        case 'Mobile App':
            return '📱';
        case 'Cross-Platform App':
            return '🔀';
        default:
            return '💻';
    }
};

const getProjectTypeBasedOnLanguages = (languages: string[]) => {
    const webLanguages = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'PHP', 'Ruby', 'Python'];
    const mobileLanguages = ['Java', 'Kotlin', 'Swift', 'Objective-C'];

    if (languages.includes('Dart')) {
        return 'Cross-Platform App';
    }

    if (languages.some(lang => webLanguages.includes(lang))) {
        return 'Web App';
    }

    if (languages.some(lang => mobileLanguages.includes(lang))) {
        return 'Mobile App';
    }

    return 'Other';
};

export default Projects;