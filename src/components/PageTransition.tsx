"use client";
import { usePageTransition } from '@/context/PageTransitionContext';
import React from 'react';
import Atom from "react-loading-indicators/Atom";

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransition({ children }: { children: ReactNode }) {
    const {
        isTransitioning,
        completeTransition,
        targetPath
    } = usePageTransition();

    return (
        <div>
            {/* Existing Page Content */}
            {children}

            {/* Transition Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <>
                        <motion.div className='fixed inset-0 z-50 bg-primary w-full h-full opacity-0' initial={{
                            opacity: 0
                        }} animate={{
                            opacity: 1
                        }}
                            transition={{
                                duration: 0.3
                            }}
                        ></motion.div>
                        <motion.div
                            className="fixed inset-0 z-50 bg-black"
                            initial={{
                                clipPath: 'circle(0% at 50% 50%)',
                                backgroundColor: 'rgba(0,0,0,0.8)'
                            }}
                            animate={{
                                clipPath: [
                                    'circle(0% at 50% 50%)',
                                    'circle(150% at 50% 50%)'
                                ],
                                backgroundColor: [
                                    'rgba(0,0,0,0.8)',
                                    'rgba(0,0,0,1)'
                                ]
                            }}
                            exit={{
                                opacity: 0
                            }}
                            transition={{
                                duration: 0.8,
                                ease: 'easeInOut'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Atom color="#3b82f6" size="large" text={"Saikat Roy"} textColor="" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}