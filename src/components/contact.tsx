import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Linkedin, Mail, Send } from 'lucide-react';
import axios from "axios";
import { FaGithub } from 'react-icons/fa';
import { CustomSelectProps, Option } from '@/app/abstract/interface';
import { useProfile } from '@/context/ProfileContext';

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        if (value) {
            const option = options.find(option => option.value === value);
            setSelectedOption(option || null);
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={selectRef}>
            <div
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption && selectedOption.label || "Select a reason"}</span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
                    >
                        {options.map((option) => (
                            <motion.li
                                key={option.value}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                            >
                                {option.label}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ContactSectionState {
    name: string;
    email: string;
    reason: string;
    message: string;
}

const ContactSection = ({ isLoaded }: { isLoaded: boolean; }) => {
    const { github, linkedIn, contactEmail } = useProfile();
    const [formState, setFormState] = useState<ContactSectionState>({
        name: '',
        email: '',
        reason: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleReasonChange = (value: string) => {
        setFormState(prev => ({ ...prev, reason: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setIsSubmitting(true);
            axios.post("/api/contact", formState).then((res) => {
                if (res.status === 200) {
                    setSubmitStatus("success");
                } else {
                    setSubmitStatus("error");
                }
            }).catch((error) => {
                console.error("Error submitting form:", error);
                setSubmitStatus("error");
            }).finally(() => {
                setIsSubmitting(false);
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        }
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', reason: '', message: '' });
    };

    const reasonOptions: Option[] = [
        { value: 'inquiry', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'collaboration', label: 'Collaboration Opportunity' },
        { value: 'other', label: 'Other' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-6xl mx-auto px-4"
        >
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl font-bold mb-5 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r to-purple-600 from-blue-500"
                style={{
                    WebkitBackgroundClip: "text",
                    MozBackgroundClip: "text",
                    backgroundClip: "text",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                Let&#39;s Connect
            </motion.h2>

            <div className="grid gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                                placeholder="Your Email"
                            />
                        </div>
                        <CustomSelect
                            options={reasonOptions}
                            value={formState.reason}
                            onChange={handleReasonChange}
                        />
                        <div className="relative">
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-3 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center text-white bg-blue-600 border-0 py-3 px-8 focus:outline-none hover:bg-blue-700 rounded-lg text-lg transition-colors duration-300"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            <Send className="ml-2" size={20} />
                        </motion.button>
                    </form>
                    {submitStatus === 'success' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-400 text-center"
                        >
                            Message sent successfully!
                        </motion.p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-8 flex flex-col justify-center items-center"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Connect with me</h3>
                        <div className="flex justify-center space-x-6">
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub size={32} />
                            </motion.a>
                            <motion.a
                                href={linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Linkedin size={32} />
                            </motion.a>
                            <motion.a
                                href={`mailto:${contactEmail}`}
                                className="text-gray-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Mail size={32} />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactSection;
