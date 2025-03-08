"use client";

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/app/abstract/interface";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from "next/image";
import React from "react";
import slugify from 'slugify';
import "@/assets/css/md.css";
import ParticleBackground from "@/components/ParticleBackground";
import { FaLinkedin } from "react-icons/fa6";

export default function ProjectDetailsContent({ projectData }: { projectData: Project }) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
            <Navigation />
            <ParticleBackground />
            <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 pt-32 md:pt-40">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="md:max-w-3xl">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl text-center md:text-start py-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r to-purple-600 from-blue-500 shadow-none"
                                style={{
                                    WebkitBackgroundClip: "text",
                                    MozBackgroundClip: "text",
                                    backgroundClip: "text",
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {projectData.title.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                            </h2>
                            <p className="text-white dark:text-gray-300 mt-2 text-sm sm:text-base md:text-lg text-justify">
                                {projectData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {/* README Content */}
                    <div className="col-span-4 md:col-span-2 lg:col-span-3 order-2 md:order-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>README</CardTitle>
                                <CardDescription>Project documentation and setup instructions</CardDescription>
                            </CardHeader>
                            <CardContent className="px-0">
                                <div className="markdown-content max-w-[calc(100vw-34px)]">
                                    <ReactMarkdown
                                        className="prose px-4 md:px-6 overflow-hidden max-w-full"
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            img: ({ node, ...props }) => (
                                                <div className="inline-flex justify-center my-4">
                                                    <img
                                                        className={`rounded-lg shadow-md ${props.alt === 'Leading Image' ? 'w-full' : 'max-w-full'}`}
                                                        style={{ maxHeight: '80vh', objectFit: 'contain' }}
                                                        {...props}
                                                        alt={props.alt || 'Image'}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ),
                                            h1: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h1 id={id} className="text-xl sm:text-2xl md:text-4xl font-bold my-4 pb-2 border-b border-gray-300 dark:border-gray-700" {...props} />;
                                            },
                                            h2: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h2 id={`#-${id}`} className="text-lg sm:text-xl md:text-3xl font-semibold mt-6 mb-4" {...props} />;
                                            },
                                            h3: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h3 id={`#-${id}`} className="text-base sm:text-lg md:text-2xl font-medium mt-4 mb-3" {...props} />;
                                            },
                                            h4: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h4 id={`#-${id}`} className="text-sm sm:text-base md:text-xl font-medium mt-3 mb-2" {...props} />;
                                            },
                                            h5: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h5 id={`#-${id}`} className="text-xs sm:text-sm md:text-lg font-normal mt-2 mb-2" {...props} />;
                                            },
                                            h6: ({ node, ...props }) => {
                                                const id = slugify(props.children!.toString(), { lower: true, strict: true });
                                                return <h6 id={`#-${id}`} className="text-xs md:text-base font-light mt-2 mb-1" {...props} />;
                                            },
                                            p: ({ node, ...props }) => {
                                                return <p className="text-gray-900 dark:text-gray-300 my-2 md:my-3 text-sm sm:text-base leading-relaxed" {...props} />;
                                            },
                                            li: ({ node, ...props }) => {
                                                return <li className="ms-4 sm:ms-8 mb-1 sm:mb-2 text-sm sm:text-base list-disc text-gray-700 dark:text-gray-300" {...props} />;
                                            },
                                            ul: ({ node, ...props }) => {
                                                return <ul className="my-0 md:my-4 space-y-1 sm:space-y-2" {...props} />
                                            },
                                            ol: ({ node, ...props }) => {
                                                return <ol className="my-2 md:my-4 space-y-1 sm:space-y-2 list-decimal ml-4 sm:ml-6" {...props} />
                                            },
                                            code: ({ node, ...props }) => {
                                                return <code className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded-md text-xs sm:text-sm font-mono" {...props} />
                                            },
                                            pre: ({ node, ...props }) => {
                                                return (
                                                    <div className="relative rounded-md my-4">
                                                        <pre
                                                            className={`bg-gray-800 text-gray-200 p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 text-wrap max-w-full rounded-md ${props.className}`}
                                                            {...props}
                                                        />
                                                    </div>
                                                )
                                            },
                                            a: ({ node, ...props }) => {
                                                const isExternal = props.href?.startsWith('http');
                                                return (
                                                    <a
                                                        href={props.href}
                                                        target={isExternal ? '_blank' : '_self'}
                                                        rel={isExternal ? 'noopener noreferrer' : undefined}
                                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-words"
                                                        {...props}
                                                    />
                                                )
                                            },
                                            table: ({ node, ...props }) => {
                                                return (
                                                    <div className="overflow-x-auto my-4 rounded-lg border border-gray-300 dark:border-gray-700">
                                                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
                                                    </div>
                                                );
                                            },
                                            th: ({ node, ...props }) => {
                                                return <th className="px-2 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider" {...props} />
                                            },
                                            td: ({ node, ...props }) => {
                                                return <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800" {...props} />
                                            },
                                            hr: ({ node, ...props }) => {
                                                return <hr className="border-gray-300 dark:border-gray-700 my-4 md:my-6" {...props} />
                                            },
                                            blockquote: ({ node, ...props }) => {
                                                return <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2 my-4 text-gray-700 dark:text-gray-300 italic" {...props} />
                                            },
                                            strong: ({ node, ...props }) => {
                                                return <strong className="font-bold" {...props} />
                                            },
                                        }}
                                    >
                                        {projectData.readme}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Sidebar */}
                    <div className="col-span-4 md:col-span-1 space-y-3 relative order-1 md:order-2">
                        <div className="sticky top-24">
                            <div className="flex justify-between sm:flex-wrap lg:flex-nowrap gap-3 mb-4">
                                <Link href={projectData.githubUrl} target='_blank' className="flex-1">
                                    <Button variant="default" className="w-full flex items-center justify-center gap-2 px-3 py-2 md:py-4 bg-purple-500 hover:bg-purple-800 transition-all duration-300">
                                        <FaGithub className="w-4 h-4" />
                                        <span className="whitespace-nowrap">View Source</span>
                                    </Button>
                                </Link>
                                {
                                    projectData.homepage && (
                                        <Link href={projectData.homepage} target='_blank' className="flex-1">
                                            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 px-3 py-2 md:py-4 transition-all duration-300">
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="whitespace-nowrap">Live Demo</span>
                                            </Button>
                                        </Link>
                                    )
                                }
                            </div>
                            {/* Role Card */}
                            {
                                projectData.role && (
                                    <Card className="m-0 mb-3">
                                        <CardHeader className="px-4 py-3">
                                            <CardTitle>Role</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <p>{projectData.role}</p>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Owner Card */}
                            {
                                projectData.owner && (
                                    <Card className="m-0 mb-3">
                                        <CardHeader className="px-4 py-3">
                                            <CardTitle>Owner</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={projectData.owner.avatar_url}
                                                    alt={projectData.owner.login}
                                                    className="w-10 h-10 rounded-full"
                                                    width={40}
                                                    height={40}
                                                    priority={true}
                                                />
                                                <Link href={`https://github.com/${projectData.owner.login}`} target="_blank">
                                                    <span className="hover:underline">{projectData.owner.login}</span>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Contributors Card */}
                            {
                                projectData.contributors.length > 0 && (
                                    <Card className="m-0 mb-3">
                                        <CardHeader className="px-4 py-3">
                                            <CardTitle>Contributors</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="flex flex-wrap gap-3">
                                                {projectData.contributors.map((contributor: any) => (
                                                    <div key={contributor.id} className="flex items-center gap-2">
                                                        <Image
                                                            src={contributor.avatar_url}
                                                            alt={contributor.login}
                                                            className="w-8 h-8 rounded-full"
                                                            width={32}
                                                            height={32}
                                                            priority={true}
                                                        />
                                                        <Link href={`https://github.com/${contributor.login}`} target="_blank">
                                                            <span className="hover:underline">{contributor.login}</span>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Technologies Card */}
                            {
                                projectData.technologies.length > 0 && (
                                    <Card className="m-0 mb-3">
                                        <CardHeader className="px-4 py-3">
                                            <CardTitle>Technologies Used</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="flex flex-wrap gap-2">
                                                {projectData.technologies.map((tech) => (
                                                    <Badge key={tech} variant="default" className="px-3 py-1 text-xs sm:text-sm">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Share Card */}
                            {
                                projectData.homepage && (
                                    <Card className="m-0 mb-3">
                                        <CardHeader className="px-4 py-3">
                                            <CardTitle>Share</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            <div className="flex gap-3 flex-wrap">
                                                <Link href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20project!%20${encodeURIComponent(projectData.title)}%20${encodeURIComponent(projectData.homepage)}`} target="_blank" className="flex-1">
                                                    <Button variant="default" className="w-full flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300">
                                                        <FaTwitter className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectData.homepage)}`} target="_blank" className="flex-1">
                                                    <Button variant="default" className="w-full flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300">
                                                        <FaFacebook className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectData.homepage)}`} target="_blank" className="flex-1">
                                                    <Button variant="default" className="w-full flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300">
                                                        <FaLinkedin className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}