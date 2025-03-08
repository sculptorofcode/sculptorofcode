"use client";

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import { FaHome } from 'react-icons/fa'
import Navigation from '@/components/Navigation';
import { usePageTransition } from '@/context/PageTransitionContext';
import errorImage from '@/assets/images/20824299_6373666.svg';

export default function NotFound() {
    const { navigateWithTransition } = usePageTransition();
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
            <ParticleBackground />
            <Navigation />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 text-center"
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-6 flex justify-center w-full"
                >
                    <div className="relative w-1/2">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
                        <Image 
                            src={errorImage}
                            alt="404 Error" 
                            priority
                            className="relative z-10 w-full"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link href="/" passHref
                        onClick={(e) => {
                            e.preventDefault();
                            navigateWithTransition('/');
                        }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group cursor-pointer inline-block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 text-lg">
                                <FaHome className="text-xl" />
                                <span>Return Home</span>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}