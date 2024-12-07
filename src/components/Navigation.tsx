import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FaHome, FaUser, FaCog, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const NavItem = ({ section, icon, isActive, onClick }: {
    section: string;
    icon: JSX.Element;
    isActive: boolean;
    onClick: (section: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
    const pathname = usePathname();

    return (
        (
            <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
            >
                <motion.a
                    href={`${pathname != '/' ? '/' : ''}#${section}`}
                    onClick={(e) => onClick(section, e)}
                    className={`flex items-center px-4 py-2 rounded-xl capitalize ${isActive ? 'text-white' : 'text-gray-300'
                        } hover:text-white transition-colors duration-300`}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                    {icon}
                    <span className="ml-2 hidden md:inline">{section}</span>
                </motion.a>
                {isActive && (
                    <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r to-purple-600 from-blue-500 rounded-xl -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                )}
            </motion.li>
        )
    )
};

const Navigation = ({ activeSection, setActiveSection, setManualScroll }: {
    activeSection?: string;
    setActiveSection?: (section: string) => void;
    setManualScroll?: (manual: boolean) => void;
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [hasScrolled, setHasScrolled] = useState(false);

    const sections = [
        { name: 'home', icon: <FaHome /> },
        { name: 'about', icon: <FaUser /> },
        { name: 'skills', icon: <FaCog /> },
        { name: 'projects', icon: <FaProjectDiagram /> },
        { name: 'contact', icon: <FaEnvelope /> }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (section: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (pathname == '/') {
            const projectsSection = document.getElementById(e.currentTarget.href.split('#')[1]);
            projectsSection?.scrollIntoView({ behavior: 'smooth' });
            setManualScroll && setManualScroll(true);
            setActiveSection && setActiveSection(section);
        } else {
            router.push(e.currentTarget.href);
        }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? `` : `p-4`} `}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <motion.div
                className={`transition-all duration-300 bg-black ${hasScrolled
                    ? 'bg-black/60 backdrop-blur-lg shadow-white'
                    : 'rounded-2xl'
                    }`}
            >
                <ul className="flex justify-center space-x-1 py-2 px-4">
                    {sections.map(({ name, icon }) => (
                        <NavItem
                            key={name}
                            section={name}
                            icon={icon}
                            isActive={activeSection === name}
                            onClick={handleClick}
                        />
                    ))}
                </ul>
            </motion.div>
        </motion.nav>
    );
};

export default Navigation;