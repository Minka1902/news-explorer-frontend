import * as React from 'react';

export default function Project(props) {
    const { project } = props;

    const onProjectClick = () => {
        window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <li className='project' onClick={onProjectClick}>
            <img className='project__image' src={require(`${project.imageUrl}`)} alt={project.name} />
            <div className='project__container'>
                <h1 className='project__name'>{project.name}</h1>
                <h2 className='project__description'>{project.description}</h2>
            </div>
        </li>
    );
}
