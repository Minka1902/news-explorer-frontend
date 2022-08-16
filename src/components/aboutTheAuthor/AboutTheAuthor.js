import React from 'react';
import aboutTheAuthorPic from '../../images/michaelScharff.jpeg';

export default function AboutTheAuthor() {
  return (
    <div className="about-the-author">
		<img className="about-the-author__image" src={aboutTheAuthorPic} alt="Michael Scharff and his dog Shah" />
		<div className="about-the-author__container">
			<h2 className="about-the-author__title">About the author</h2>
			<p className="about-the-author__text">Michael Scharff, 22 years of age, served in the IDF as a team leader and later as a platoon sargent.
			
			was released in March 2021, since them worked as a sequrity guard. started Practicum100's Full Stack Web Developer course in October 2021.</p>
		</div>
	</div>
  );
}
