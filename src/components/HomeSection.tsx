import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { useProfile } from '@/context/ProfileContext';
import Image from 'next/image';
import ParticleBackground from './ParticleBackground';

const HomeSection = ({ isLoaded }: { isLoaded: boolean; }) => {
    const { github, linkedIn, contactEmail } = useProfile();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 w-screen" ref={containerRef}>
            <ParticleBackground />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12"
            >
                <div className="flex flex-col-reverse md:flex-row grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-3 space-y-8 flex-1"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 relative">
                                Saikat Roy
                                <span className="absolute -inset-1 bg-blue-500/20 blur-xl"></span>
                            </span>
                        </h1>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
                            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
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
                                    className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                    repeat={Infinity}
                                />
                            </div>
                        </div>

                        <motion.div
                            className="flex flex-wrap gap-6"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            {[
                                { href: github, icon: FaGithub, label: "GitHub" },
                                { href: linkedIn, icon: FaLinkedin, label: "LinkedIn" },
                                { href: `mailto:${contactEmail}`, icon: FaEnvelope, label: "Email" }
                            ].map((item, index) => (
                                item.href && (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                        <div className="relative flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                                            <item.icon className="text-2xl text-blue-400 group-hover:text-blue-300" />
                                            <span className="text-white/90 font-medium">{item.label}</span>
                                        </div>
                                    </motion.a>
                                )
                            ))}
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group cursor-pointer"
                            onClick={() => window.open('/Saikat_Roy_Resume.pdf', '_blank')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 text-lg">
                                <FaDownload className="text-xl" />
                                <span>Download Resume</span>
                            </div>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-2 relative w-full md:w-1/2 mt-14 md:mt-0"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse blur-2xl opacity-30"></div>
                            <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse blur-xl opacity-20"></div>

                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 backdrop-blur-sm">
                                <Image
                                    src="/kpyps.webp"
                                    alt="Saikat Roy - Computer Science Student and Full Stack Developer"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomeSection;