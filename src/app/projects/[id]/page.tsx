import React from 'react';
import { notFound } from 'next/navigation';
import ProjectDetailsContent from './projectDetails';
import { Octokit } from 'octokit';
import { Project } from '@/app/abstract/interface';
import Head from 'next/head';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const projectData = await getProjectData(params.id);

    if (!projectData) {
        return {
            title: 'Project Not Found - Saikat Roy',
            description: 'The project you are looking for could not be found.',
            robots: 'noindex, nofollow',
        };
    }

    return {
        title: `${projectData.title.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())} - Saikat Roy`,
        description: projectData.description || 'A project by Saikat Roy focusing on web development and cybersecurity.',
        openGraph: {
            title: projectData.title.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
            description: projectData.description || 'A project by Saikat Roy',
            url: projectData.html_url,
            images: [
                {
                    url: projectData.owner.avatar_url || 'https://cyber-saikat.vercel.app/profile.jpg',
                    alt: projectData.owner.login,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: projectData.name,
            description: projectData.description || 'A project by Saikat Roy',
            images: [
                {
                    url: projectData.owner.avatar_url || 'https://cyber-saikat.vercel.app/profile.jpg',
                    alt: projectData.owner.login,
                },
            ],
        },
        alternates: {
            canonical: `https://cyber-saikat.vercel.app/projects/${params.id}`,
        },
    };
}

async function getProjectData(id: string): Promise<Project | null> {
    const GithubToken = process.env.GITHUB_PERSON_API_KEY;
    const username = process.env.GITHUB_USERNAME;
    try {

        const octokit = new Octokit({ auth: GithubToken });

        id = decodeURIComponent(id).replace(/ /g, '-').toLowerCase();

        const projectData = await octokit.request(`GET /repos/${username}/${id}`).then((response) => {
            return response.data;
        }).catch(() => {
            return null;
        });
        if (!projectData) return null;

        const languagesData = await octokit.request(`GET ${projectData.languages_url}`).then((response) => {
            return response.data;
        }).catch(() => {
            return null;
        });
        const languages = Object.keys(languagesData);

        const contributorsData = await octokit.request(`GET ${projectData.contributors_url}`).then((response) => {
            return response.data;
        }).catch(() => {
            return null;
        });

        const readmeResponse = await octokit.request(`GET /repos/${username}/${id}/readme`, {
            headers: {
                Accept: 'application/vnd.github.v3.raw',
            },
        }).then((response) => {
            return response.data;
        }).catch(() => {
            return null;
        });
        if (!readmeResponse) return null;

        return {
            id: projectData.id,
            name: projectData.name,
            html_url: projectData.html_url,
            readme: readmeResponse,
            title: projectData.name,
            description: projectData.description,
            technologies: languages,
            role: projectData.role,
            githubUrl: projectData.html_url,
            homepage: projectData.homepage,
            contributors: contributorsData,
            owner: {
                login: projectData.owner.login,
                avatar_url: projectData.owner.avatar_url,
                html_url: projectData.owner.html_url,
            },
            type: projectData.type,
            languages: languages,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const ProjectDetails = async ({ params }: { params: { id: string } }) => {
    const projectData = await getProjectData(params.id);
    if (!projectData) {
        notFound();
    }

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="https://cyber-saikat.vercel.app/images/favicon.ico" type="image/x-icon" />
            </Head>
            <ProjectDetailsContent projectData={projectData} />
            <footer className="text-center py-4 bg-gray-800">
                <p>&copy; 2024 Saikat Roy. All rights reserved.</p>
            </footer>
        </>
    );
}

export default ProjectDetails;