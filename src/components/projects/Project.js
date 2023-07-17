import * as React from 'react';
import CurrentProjectContext from '../../contexts/CurrentProjectContext';

export default function Project(props) {
    const { project, openProject, isEven } = props;
    const { setCurrentProject } = React.useContext(CurrentProjectContext);

    const onOpen = () => {
        setCurrentProject(project);
        openProject();
    };

    return (
        <li className={`project ${isEven ? 'project_reversed' : ''}`} onClick={onOpen}>
            <img className='project__image' src={project.imageUrl} alt={project.name} />
            <div className='project__container'>
                <h1 className='project__name'>{project.name}</h1>
                <h2 className='project__description'>{project.description}</h2>
            </div>
        </li>
    );
};
