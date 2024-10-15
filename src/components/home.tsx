import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { useProfile } from '@/context/ProfileContext';

const HomeSection = ({ isLoaded }: { isLoaded: boolean; }) => {
    
    const { github, linkedIn, contactEmail } = useProfile();

    return (
        <div className="pb-10 sm:pb-0">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-6xl mx-auto px-4"
            >
                <div className="grid grid-cols-1 gap-12 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white bg-clip-text text-nowrap text-center"
                            style={{
                                WebkitBackgroundClip: "text",
                                MozBackgroundClip: "text",
                                backgroundClip: "text",
                            }}>
                            Saikat Roy
                        </h1>
                        <div className="h-14 sm:h-20 bg-gray-800 bg-opacity-50 rounded-lg p-4 backdrop-blur-sm flex items-center justify-center">
                            <TypeAnimation
                                sequence={[
                                    'Computer Science Student',
                                    2000,
                                    'Full Stack Developer',
                                    2000,
                                    'Cybersecurity Enthusiast',
                                    2000,
                                ]}
                                wrapper="p"
                                speed={50}
                                className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-200"
                                repeat={Infinity}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-16 flex flex-wrap justify-center items-center gap-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    {[
                        { href: github, icon: FaGithub, label: "GitHub" },
                        {
                            href: linkedIn, icon: FaLinkedin, label: "LinkedIn"
                        },
                        { href: `mailto:${contactEmail}`, icon: FaEnvelope, label: "Email" }
                    ].map((item, index) => (
                        item.href && (
                            <motion.a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center space-x-2 text-white hover:text-blue-300 transition-colors duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <item.icon className="text-sm sm:text-3xl group-hover:text-blue-400 transition-colors duration-300" />
                                <span className="text-sm group-hover:underline">{item.label}</span>
                            </motion.a>
                        )
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#4c51bf" }}  // Add Framer Motion background color transition
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center justify-center text-lg"
                    >
                        <FaDownload className="mr-2" /> Download Resume
                    </motion.button>

                </motion.div>
            </motion.div>
        </div>
    );
};

export default HomeSection;