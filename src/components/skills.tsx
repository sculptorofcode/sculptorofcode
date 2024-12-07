import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
    Code, Server, Database, Layout, Briefcase, Brain,
    ChevronRight,
    FileText,
    Shield,
    Wrench,
    MessageSquare,
    Calendar
} from 'lucide-react';
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJava, FaJs, FaLaravel, FaLightbulb, FaNode, FaNpm, FaPhp, FaPython, FaReact } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiExpress, SiMysql, SiStyledcomponents } from "react-icons/si";
import { TbBrandFramerMotion, TbSql } from "react-icons/tb";
import { RiFirebaseFill, RiFlutterFill, RiNextjsLine } from "react-icons/ri";
import { MdDesignServices } from "react-icons/md";
import { FaC, FaFigma } from "react-icons/fa6";
import { BiLogoMongodb, BiLogoPostgresql } from "react-icons/bi";
import { BsFiletypeScss } from "react-icons/bs";

const skillCategories = [
    {
        name: 'Frontend Development',
        icon: <Code className="w-6 h-6" />,
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'React', icon: <FaReact />, level: 80, description: 'Advanced React development' },
            { name: 'Next.js', icon: <RiNextjsLine />, level: 90, description: 'Server-side rendering & static generation' },
            { name: 'HTML', icon: <FaHtml5 />, level: 100, description: 'Semantic HTML & accessibility' },
            { name: 'CSS', icon: <FaCss3 />, level: 100, description: 'Advanced styling & animations' },
            { name: 'JavaScript', icon: <FaJs />, level: 99.9, description: 'ES6+ features & modern practices' },
            { name: 'TypeScript', icon: <SiTypescript />, level: 90, description: 'Type-safe development' },
            { name: 'TailwindCSS', icon: <SiTailwindcss />, level: 99.9, description: 'Utility-first CSS framework' },
            { name: 'Bootstrap', icon: <FaBootstrap />, level: 99.9, description: 'Responsive design framework' },
            { name: 'Framer Motion', icon: <TbBrandFramerMotion />, level: 80, description: 'Animation library' },
            { name: 'jQuery', icon: <FileText />, level: 80, description: 'DOM manipulation' },
            { name: 'SCSS/SASS', icon: <BsFiletypeScss />, level: 80, description: 'CSS preprocessor' },
            { name: 'Styled Components', icon: <SiStyledcomponents />, level: 80, description: 'CSS-in-JS library' },
            { name: 'npm/yarn', icon: <FaNpm />, level: 99.9, description: 'Package management' },
            { name: 'Figma', icon: <FaFigma />, level: 60, description: 'UI/UX design' }
        ]
    },
    {
        name: 'Backend Development',
        icon: <Server className="w-6 h-6" />,
        color: 'green',
        gradient: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'Node.js', icon: <FaNode />, level: 80, description: 'Server-side JavaScript' },
            { name: 'Express.js', icon: <SiExpress />, level: 80, description: 'Web application framework' },
            { name: 'Python', icon: <FaPython />, level: 70, description: 'Backend development & scripting' },
            { name: 'PHP', icon: <FaPhp />, level: 99.9, description: 'Server-side scripting' },
            { name: 'Java', icon: <FaJava />, level: 50, description: 'Enterprise development' },
            { name: 'Laravel', icon: <FaLaravel />, level: 85, description: 'PHP framework' },
            { name: 'C', icon: <FaC />, level: 60, description: 'System programming' }
        ]
    },
    {
        name: 'Database & Storage',
        icon: <Database className="w-6 h-6" />,
        color: 'yellow',
        gradient: 'from-yellow-500 to-orange-500',
        skills: [
            { name: 'MongoDB', icon: <BiLogoMongodb />, level: 80, description: 'NoSQL database' },
            { name: 'MySQL', icon: <SiMysql />, level: 99.9, description: 'Relational database' },
            { name: 'PostgreSQL', icon: <BiLogoPostgresql />, level: 80, description: 'Advanced relational database' },
            { name: 'Firebase', icon: <RiFirebaseFill />, level: 80, description: 'Backend as a Service' },
            { name: 'SQL', icon: <TbSql />, level: 80, description: 'Database querying' }
        ]
    },
    {
        name: 'Mobile Development',
        icon: <Layout className="w-6 h-6" />,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        skills: [
            { name: 'Flutter', icon: <RiFlutterFill />, level: 90, description: 'Cross-platform development' },
            { name: 'Flutter Bloc', icon: <ChevronRight />, level: 70, description: 'State management' }
        ]
    },
    {
        name: 'Tools & Practices',
        icon: <Briefcase className="w-6 h-6" />,
        color: 'red',
        gradient: 'from-red-500 to-rose-500',
        skills: [
            { name: 'Git', icon: <FaGit />, level: 90, description: 'Version control' },
            { name: 'GitHub', icon: <FaGithub />, level: 90, description: 'Collaboration & CI/CD' },
            { name: 'Security Systems', icon: <Shield />, level: 90, description: 'Application security' },
            { name: 'Application Design', icon: <MdDesignServices />, level: 85, description: 'Software architecture' }
        ]
    },
    {
        name: 'Soft Skills',
        icon: <Brain className="w-6 h-6" />,
        color: 'pink',
        gradient: 'from-indigo-500 to-violet-500',
        skills: [
            { name: 'Problem Solving', icon: <Wrench />, level: 99.9, description: 'Analytical thinking' },
            { name: 'Communication', icon: <MessageSquare />, level: 99.9, description: 'Clear & effective communication' },
            { name: 'Time Management', icon: <Calendar />, level: 99.9, description: 'Project planning & execution' },
            { name: 'Creativity', icon: <FaLightbulb />, level: 80, description: 'Innovative solutions' },
            { name: 'Teamwork', icon: <Briefcase />, level: 90, description: 'Collaborative work' },
            { name: 'Leadership', icon: <Briefcase />, level: 90, description: 'Leading a team' }
        ]
    }
];


interface Skill {
    name: string;
    icon: React.JSX.Element;
    level: number;
    description: string;
}

interface SkillCardProps {
    skill: Skill;
    categoryColor: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, categoryColor }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    className={`bg-gray-800 hover:bg-gray-700 rounded-xl p-4 flex flex-col items-center gap-2
                     border border-gray-700 hover:border-${categoryColor}-500 transition-colors shadow-lg`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-2xl mb-2">{skill.icon}</span>
                    <span className="font-medium text-sm text-center">{skill.name}</span>
                    <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-${categoryColor}-500`}
                            style={{ width: `${(skill.level / 100) * 100}%` }}
                        />
                        <span className='bg-yellow-500'></span>
                        <span className='bg-red-500'></span>
                    </div>
                </motion.div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{skill.description}</p>
                <p className="text-sm text-gray-400">Proficiency: {skill.level}%</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const MergedSkillsShowcase = () => {
    const [selectedCategory, setSelectedCategory] = useState('Frontend Development');
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">
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
                    Skills & Expertise
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Category Selection */}
                    <div className="space-y-4">
                        {skillCategories.map((category) => (
                            <motion.button
                                key={category.name}
                                onClick={() => {
                                    setSelectedCategory(category.name);
                                }}
                                className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all
                  ${selectedCategory === category.name
                                        ? `bg-gradient-to-r ${category.gradient} text-white`
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {category.icon}
                                <span className="font-medium">{category.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Skills Display */}
                    <div className="md:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-800 rounded-xl p-6 shadow-xl"
                            >
                                <div
                                    className={`flex items-center gap-3 mb-6 rounded-lg`}
                                >
                                    {skillCategories.find(cat => cat.name === selectedCategory)?.icon}
                                    <h3 className="text-2xl font-semibold text-white">
                                        {selectedCategory}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {skillCategories
                                        .find(cat => cat.name === selectedCategory)
                                        ?.skills.map((skill) => (
                                            <SkillCard
                                                key={skill.name}
                                                skill={skill}
                                                categoryColor={skillCategories.find(cat => cat.name === selectedCategory)?.color || 'blue'}
                                            />
                                        ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MergedSkillsShowcase;