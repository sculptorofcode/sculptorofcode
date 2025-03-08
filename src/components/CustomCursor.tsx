"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

    const updateCursor = useCallback((point: { x: number; y: number }) => {
        cursorX.set(point.x);
        cursorY.set(point.y);
        
        // Add trail effect
        setTrails(prev => [...prev, { x: point.x, y: point.y, id: (Date.now() * Math.random()) }]
            .slice(-12)); // Keep last 12 points for trail
    }, [cursorX, cursorY]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        updateCursor({ x: event.clientX, y: event.clientY });

        // Magnetic effect for interactive elements
        const target = event.target as HTMLElement;
        const isInteractive = target.closest('button') || target.closest('a');
        
        if (isInteractive) {
            const rect = (target.closest('button') || target.closest('a'))!.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(event.clientX - centerX, 2) + 
                Math.pow(event.clientY - centerY, 2)
            );
            
            if (distance < 100) { // Magnetic radius
                const strength = Math.max(0, (100 - distance) / 100);
                updateCursor({
                    x: event.clientX + (centerX - event.clientX) * strength * 0.3,
                    y: event.clientY + (centerY - event.clientY) * strength * 0.3
                });
            }
        }
    }, [updateCursor]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', () => setIsClicked(true));
        window.addEventListener('mouseup', () => setIsClicked(false));
        window.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest('button, a, input, textarea'));
        });
        window.addEventListener('mouseout', () => setIsHovered(false));

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', () => setIsClicked(true));
            window.removeEventListener('mouseup', () => setIsClicked(false));
        };
    }, [handleMouseMove]);

    return (
        <>
            {/* Cursor trails */}
            {trails.map((trail, index) => (
                <motion.div
                    key={trail.id}
                    className="cursor-trail"
                    style={{
                        left: trail.x,
                        top: trail.y,
                        opacity: index / trails.length,
                        scale: 1 - index / trails.length
                    }}
                />
            ))}

            {/* Main cursor */}
            <motion.div
                className="cursor-ring-outer"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring
                }}
                animate={{
                    scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.5 : 1
                }}
            />
            <motion.div
                className="cursor-dot-inner"
                style={{
                    x: cursorX,
                    y: cursorY
                }}
                animate={{
                    scale: isClicked ? 1.2 : isHovered ? 0.5 : 1
                }}
            />
        </>
    );
};

export default CustomCursor;
