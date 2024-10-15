
export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    role: string;
    githubUrl: string;
    name: string;
    html_url: string;
    readme: string;
    homepage: string;
    contributors: any[];
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    type: string;
    languages: string[];
}


export interface Option {
    value: string;
    label: string;
}

export interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}