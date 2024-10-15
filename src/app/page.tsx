"use client";

import { useState, useEffect, useRef } from 'react'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import ParticlesBackground from '@/components/ParticlesBackground'
import Navigation from '@/components/Navigation';
import HomeSection from '@/components/home';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [manualScroll, setManualScroll] = useState(false);

  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    setIsLoaded(true);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !manualScroll) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    Object.values(sectionsRef).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [manualScroll]);

  useEffect(() => {
    const timeout = setTimeout(() => setManualScroll(false), 1000);
    return () => clearTimeout(timeout);
  }, [activeSection]);

  return (
    <>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} setManualScroll={setManualScroll} />

      <main className="container mx-auto px-4">
        <section id="home" ref={sectionsRef.home} className={`pt-40 sm:min-h-screen flex items-center justify-center relative overflow-hidden sm:pt-20`}>
          <HomeSection isLoaded={isLoaded} />
        </section>
        <section id="about" ref={sectionsRef.about} className='sm:py-20  py-10'>
          <About />
        </section>
        <section id="skills" ref={sectionsRef.skills} className='sm:py-20  py-10'>
          <Skills />
        </section>
        <section id="projects" ref={sectionsRef.projects} className='sm:py-20  py-10'>
          <Projects />
        </section>
        <section id="contact" ref={sectionsRef.contact} className='sm:py-20 '>
          <Contact isLoaded={isLoaded} />
        </section>
      </main>

      <footer className="text-center py-4 bg-gray-800">
        <p>&copy; 2024 Saikat Roy. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Home
