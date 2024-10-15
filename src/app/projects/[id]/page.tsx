import React from 'react';
import { notFound } from 'next/navigation';
import ProjectDetailsContent from './projectDetails';
import { Octokit } from 'octokit';
import { Project } from '@/app/abstract/interface';


const GithubToken = process.env.GITHUB_PERSON_API_KEY;
const username = process.env.GITHUB_USERNAME;

async function getProjectData(id: string): Promise<Project | null> {
    try {

        const octokit = new Octokit({ auth: GithubToken });

        id = decodeURIComponent(id).replace(/ /g, '-').toLowerCase();

        console.log(`GET /repos/${username}/${id}`);

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
        <ProjectDetailsContent projectData={projectData} />
    );
}

export default ProjectDetails;