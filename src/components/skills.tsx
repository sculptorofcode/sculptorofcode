import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Code, Server, Lock, Cpu } from 'lucide-react';

const skillCategories = [
    {
        name: 'Languages',
        icon: <Code />,
        color: 'blue',
        skills: [
            { name: 'JavaScript', level: 4, description: '5+ years of experience' },
            { name: 'TypeScript', level: 3, description: '3 years of experience' },
            { name: 'Python', level: 4, description: '4+ years of experience' },
            { name: 'Java', level: 3, description: '3 years of experience' },
            { name: 'HTML', level: 5, description: '6+ years of experience' },
            { name: 'CSS', level: 4, description: '5+ years of experience' },
            { name: 'SQL', level: 3, description: '2 years of experience' },
            { name: 'PHP', level: 3, description: '2 years of experience' },
            { name: 'C', level: 3, description: '2 years of experience' },
            { name: 'Dart', level: 3, description: '2 years of experience' },
        ]
    },
    {
        name: 'Frameworks & Libraries',
        icon: <Server />,
        color: 'green',
        skills: [
            { name: 'React', level: 4, description: '4 years of experience' },
            { name: 'Next.js', level: 3, description: '2 years of experience' },
            { name: 'Node.js', level: 4, description: '4 years of experience' },
            { name: 'Express', level: 3, description: '3 years of experience' },
            { name: 'TailwindCSS', level: 4, description: '3 years of experience' },
            { name: 'Bootstrap', level: 4, description: '3 years of experience' },
            { name: 'Flutter', level: 3, description: '2 years of experience' },
            { name: 'jQuery', level: 3, description: '2 years of experience' },
        ]
    },
    {
        name: 'Tools & Technologies',
        icon: <Cpu />,
        color: 'purple',
        skills: [
            { name: 'Git', level: 5, description: '5+ years of experience' },
            { name: 'Firebase', level: 4, description: '3 years of experience' },
            { name: 'MongoDB', level: 3, description: '2 years of experience' },
            { name: 'PostgreSQL', level: 4, description: '3 years of experience' }
        ]
    },
];

const SkillBadge = ({ skill, color }: {
    skill: { name: string; level: number; description: string };
    color: string;
}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    className={`bg-gray-800 text-${color}-400 rounded-lg p-3 flex flex-col items-center justify-center`}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="font-semibold">{skill.name}</span>
                </motion.div>
            </TooltipTrigger>
        </Tooltip>
    </TooltipProvider>
);

const Skills = () => {
    const [filter, setFilter] = useState('All');

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };
    return (
        <section id="skills" className="relative overflow-hidden">
            <motion.div
                className="container mx-auto px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                    Skills
                </motion.h2>
                <div className="mb-8 flex justify-start sm:justify-center space-x-4 overflow-x-auto">
                    <button
                        onClick={() => setFilter('All')}
                        className={`px-4 text-sm sm:text-lg py-2 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        All
                    </button>
                    {skillCategories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setFilter(category.name)}
                            className={`px-4 text-sm sm:text-lg py-2 rounded text-nowrap ${filter === category.name ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="space-y-12">
                    {skillCategories.map((category, index) => (
                        (filter === 'All' || filter === category.name) && (
                            <div key={index}>
                                <h3 className="text-2xl font-semibold mb-4 text-teal-300 flex items-center">
                                    {category.icon}
                                    <span className="ml-2">{category.name}</span>
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBadge key={skillIndex} skill={skill} color={category.color} />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </motion.div>
            <div className="mt-16 border-t border-gray-700 w-full"></div>
        </section>
    );
};

export default Skills;