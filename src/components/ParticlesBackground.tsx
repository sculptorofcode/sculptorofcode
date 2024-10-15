"use client";

import React, { useEffect, useRef } from 'react';

const EnhancedParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        interface Particle {
            x: number;
            y: number;
            radius: number;
            color: string;
            velocity: { x: number; y: number };
        }

        const particles: Particle[] = [];
        const particleCount = 100;
        let mouseX = 0;
        let mouseY = 0;

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`,
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
            },
        });

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        const drawParticle = (particle: Particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;

                if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

                // Mouse interaction
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    particle.x += (mouseX - particle.x) * 0.05;
                    particle.y += (mouseY - particle.y) * 0.05;
                }

                drawParticle(particle);
            });

            connectParticles();
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: -1,
            }}
        />
    );
};

export default EnhancedParticleBackground;