import * as React from 'react';

export default function Project(props) {
    const { project, openProject, setImageDiscription, setImageAlt, setImageSrc, isEven } = props;

    const onProjectClick = () => {
        window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    };

    const onOpen = () => {
        setImageSrc(project.imageUrl);
        setImageDiscription(project.description);
        setImageAlt(project.name);
        openProject();
    }

    return (
        <li className={`project ${isEven ? 'project_reversed' : ''}`} onClick={onOpen}>
            <img className='project__image' src={project.imageUrl} alt={project.name} />
            <div className='project__container'>
                <h1 className='project__name'>{project.name}</h1>
                <h2 className='project__description'>{project.description}</h2>
            </div>
        </li>
    );
}
