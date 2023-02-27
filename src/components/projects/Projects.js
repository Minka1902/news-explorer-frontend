import * as React from 'react';
import Project from './Project';

export default function Projects() {
	const projects = [{ name: 'EPSG convert program and Map', imageUrl: '../../images/map-project-image.jpg', description: `This project was built using react-leaflet and openStreetMap resources. Very easy to use and understand. Just enter the location and convert it from EPSG 4326 to any EPSG you want.`, projectUrl: 'http://localhost:3000/' }];

	return (
		<section className='projects'>
			<h1 className='projects__title'>Other Projects</h1>
			<ul className='projects__list'>
				{projects.map((project) => {
					return <Project project={project} key={1} />;
				})}
			</ul>
		</section>
	);
}
