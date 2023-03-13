import * as React from 'react';
import Project from './Project';
import projects from '../../constants/projects';

export default function Projects(props) {
	const { openProject, setImageDiscription, setImageAlt, setImageSrc } = props;

	return (
		<section className='projects'>
			<h1 className='projects__title'>Other Projects</h1>
			<ul className='projects__list'>
				{projects.map((project, idnex) => {
					return <Project key={idnex}
						project={project}
						openProject={openProject}
						setImageDiscription={setImageDiscription}
						setImageAlt={setImageAlt}
						setImageSrc={setImageSrc}
					/>;
				})}
			</ul>
		</section>
	);
}
