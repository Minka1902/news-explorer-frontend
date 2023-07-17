import * as React from 'react';
import Project from './Project';
import projects from '../../constants/projects';

export default function Projects(props) {
	const { openProject } = props;

	return (
		<section id='projects' className='projects'>
			<h1 className='projects__title'>Other Projects</h1>
			<ul className='projects__list'>
				{projects.map((project, index) => {
					return <Project key={index}
						isEven={(index + 1) % 2 === 0 ? true : false}
						project={project}
						openProject={openProject}
					/>;
				})}
			</ul>
		</section>
	);
};
