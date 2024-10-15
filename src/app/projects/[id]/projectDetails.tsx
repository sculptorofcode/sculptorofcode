"use client";

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import { Project } from "@/app/abstract/interface";
import Image from "next/image";

export default function ProjectDetailsContent({ projectData }: { projectData: Project }) {
    return (
        <div className="min-h-screen dark:from-gray-900 dark:to-gray-800">
            <Navigation />
            <main className="max-w-6xl mx-auto p-4 space-y-8 pt-40">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2
                                className="text-2xl sm:text-5xl py-2 shadow-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r to-purple-600 from-blue-500"
                                style={{
                                    WebkitBackgroundClip: "text",
                                    MozBackgroundClip: "text",
                                    backgroundClip: "text",
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {projectData.title.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                            </h2>
                            <p className="text-white dark:text-gray-300 mt-2 text-sm sm:text-lg text-justify">
                                {projectData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-4 gap-6">

                    {/* README Content */}
                    <div className="col-span-4 sm:col-span-3 order-2 sm:order-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>README</CardTitle>
                                <CardDescription>Project documentation and setup instructions</CardDescription>
                            </CardHeader>
                            <CardContent className="">
                                <div className="markdown-content">
                                    <ReactMarkdown
                                        className="prose max-w-full"
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            img: ({ node, ...props }) => (
                                                <img
                                                    style={{ maxWidth: '100%', borderRadius: '8px', width: `${props.alt == 'Leading Image' ? `100%` : ``}` }}
                                                    {...props}
                                                    alt={props.alt || 'Image'}
                                                />
                                            ),
                                            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-8 mb-4" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mt-6 mb-4" {...props} />,
                                            p: ({ node, ...props }) => {
                                                return <p className="text-gray-900 dark:text-gray-300 my-1" {...props} />
                                            },
                                            li: ({ node, ...props }) => {
                                                return <li className="custom-li ms-8 list-disc list-inside text-gray-700" {...props} />
                                            },
                                            code: ({ node, ...props }) => {
                                                return <code className="bg-gray-800 text-gray-200 p-1 rounded-md px-2" {...props} />
                                            },
                                            pre: ({ node, ...props }) => {
                                                return <pre className="bg-gray-800 text-gray-200 p-1 rounded-md break-words text-wrap px-4" {...props} />
                                            },
                                            a: ({ node, ...props }) => {
                                                return <a target={'_blank'} className="text-blue-500 hover:underline" {...props} />
                                            },
                                            table: ({ node, ...props }) => {
                                                return <table className="table-auto w-full" {...props} />
                                            },
                                            th: ({ node, ...props }) => {
                                                return <th className="border px-4 py-2" {...props} />
                                            },
                                            td: ({ node, ...props }) => {
                                                return <td className="border px-4 py-2" {...props} />
                                            },
                                            hr: ({ node, ...props }) => {
                                                return <hr className="border-gray-400 my-4" {...props} />
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
                    <div className="col-span-4 sm:col-span-1 space-y-2 relative order-1 sm:order-2">
                        <div className="sticky top-20">
                            <div className="flex sm:justify-between gap-3 mb-3">
                                <Link href={projectData.githubUrl} target='_blank'>
                                    <Button variant="default" className="flex items-center gap-2 px-3 bg-purple-500 hover:bg-purple-800 transition-all duration-300">
                                        <FaGithub className="w-4 h-4" />
                                        View Source
                                    </Button>
                                </Link>
                                {
                                    projectData.homepage && (
                                        <Link href={projectData.homepage} target='_blank'>
                                            <Button variant="secondary" className="flex items-center gap-2 px-3 transition-all duration-300">
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </Button>
                                        </Link>
                                    )
                                }
                            </div>
                            {/* Role Card */}
                            {
                                projectData.role && (
                                    <Card className="m-0">
                                        <CardHeader className="px-3 py-3">
                                            <CardTitle>Role</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <p>{projectData.role}</p>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Owner Card */}
                            {
                                projectData.owner && (
                                    <Card className="m-0 mt-3">
                                        <CardHeader className="px-3 py-3">
                                            <CardTitle>Owner</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={projectData.owner.avatar_url}
                                                    alt={projectData.owner.login}
                                                    className="w-8 h-8 rounded-full"
                                                    width={32}
                                                    height={32}
                                                />
                                                <Link href={``} target="_blank">
                                                    <span>{projectData.owner.login}</span>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }
                            {/* Contributors Card */}
                            {
                                projectData.contributors.length > 0 && (
                                    <Card className="m-0 mt-3">
                                        <CardHeader className="px-3 py-3">
                                            <CardTitle>Contributors</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <div className="flex flex-wrap gap-2">
                                                {projectData.contributors.map((contributor: any) => (
                                                    <div key={contributor.id} className="flex items-center gap-2">
                                                        <Image
                                                            src={contributor.avatar_url}
                                                            alt={contributor.login}
                                                            className="w-8 h-8 rounded-full"
                                                            width={32}
                                                            height={32}
                                                        />
                                                        <Link href={`https://github.com/${contributor.login}`} target="_blank">
                                                            <span>{contributor.login}</span>
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
                                    <Card className="m-0 mt-3">
                                        <CardHeader className="px-3 py-3">
                                            <CardTitle>Technologies Used</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <div className="flex flex-wrap gap-2">
                                                {projectData.technologies.map((tech) => (
                                                    <Badge key={tech} variant="default">
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
                                    <Card className="m-0 mt-3">
                                        <CardHeader className="px-3 py-3">
                                            <CardTitle>Share</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-2">
                                            <div className="flex gap-1">
                                                <Link href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20project!%20${encodeURIComponent(projectData.title)}%20${encodeURIComponent(projectData.homepage)}`} target="_blank">
                                                    <Button variant="default" className="flex items-center gap-2 px-3 transition-all duration-300">
                                                        <FaTwitter className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectData.homepage)}`} target="_blank" className="flex items-center gap-2 px-3 transition-all duration-300">
                                                    <Button variant="default" className="flex items-center gap-2 px-3 transition-all duration-300">
                                                        <FaFacebook className="w-4 h-4" />
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