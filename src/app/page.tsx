"use client";

import { useState, useEffect, useRef } from 'react';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Navigation from '@/components/Navigation';
import HomeSection from '@/components/HomeSection';
import MergedSkillsShowcase from '@/components/skills';

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
    }, { 
      threshold: [0.2, 0.5, 0.8],
      rootMargin: '-10% 0px -10% 0px' 
    });

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

      <main>
        <section id="home" ref={sectionsRef.home} className={`sm:min-h-screen flex items-center justify-center relative overflow-hidden`}>
          <HomeSection isLoaded={isLoaded} />
        </section>
        <section id="about" ref={sectionsRef.about} className='sm:pt-[7.5rem] py-10 pt-[5rem] bg-black'>
          <About />
        </section>
        <section id="skills" ref={sectionsRef.skills} className='sm:pt-[7.5rem] py-10 pt-[5rem] bg-black'>
          <MergedSkillsShowcase />
        </section>
        <section id="projects" ref={sectionsRef.projects} className='sm:pt-[7.5rem] py-20 pt-[5rem] min-h-screen bg-black'>
          <Projects />
        </section>
        <section id="contact" ref={sectionsRef.contact} className='sm:pt-[7.5rem] py-10 pt-[5rem] bg-black'>
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
