import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaShieldAlt, FaAward } from 'react-icons/fa';

const About = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const highlightText = (text: string) => {
        const keywords = ['Computer Science', 'Web Development', 'Cybersecurity'];
        return text.split(' ').map((word, index) =>
            keywords.some(keyword => keyword.toLowerCase().includes(word.toLowerCase())) ?
                <span key={index} className="text-neon-blue font-semibold">{word} </span> :
                word + ' '
        );
    };

    const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        const projectsSection = document.getElementById('projects');
        projectsSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className='container'
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
                About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
                <motion.div className="space-y-6" variants={itemVariants}>
                    <p className="text-sm text-justify sm:text-start sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        {highlightText("Hello! I'm Saikat Roy, a passionate Computer Science student with a keen interest in Web Development and Cybersecurity. I'm constantly exploring new technologies and methodologies to enhance my skills and contribute to the ever-evolving world of technology.")}
                    </p>
                    <p className="text-sm text-justify sm:text-start sm:text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        My journey in computer science has been driven by curiosity and a desire to create innovative solutions to real-world problems. I believe in the power of technology to make a positive impact on society and am committed to being a part of that change.
                    </p>
                    <motion.div
                        className="bg-gradient-to-r to-purple-600 from-blue-500 p-1 rounded-lg mt-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="#projects"
                            onClick={scrollToProjects}
                            className="block bg-gray-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
                        >
                            View Projects
                        </a>
                    </motion.div>
                </motion.div>
                <motion.div className="space-y-8" variants={containerVariants}>
                    {[
                        { icon: FaGraduationCap, color: 'text-blue-400', title: 'Education', description: 'Diploma in Computer Science and Technology (CST)', subtext: 'Expected Graduation: 2025' },
                        { icon: FaLaptopCode, color: 'text-teal-300', title: 'Current Focus', description: 'Full-stack Web Development', subtext: 'React, Node.js, Express, MongoDB' },
                        { icon: FaShieldAlt, color: 'text-purple-400', title: 'Passion Project', description: 'Cybersecurity Research', subtext: 'Focusing on web application security' }
                    ].map((item, index) => (
                        <motion.div key={index} className="flex items-center space-x-6 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300" variants={itemVariants}>
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`text-5xl ${item.color}`}
                            >
                                <item.icon />
                            </motion.div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
                                <p className="text-sm sm:text-lg text-gray-300">{item.description}</p>
                                <p className="text-sm text-gray-400">{item.subtext}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;