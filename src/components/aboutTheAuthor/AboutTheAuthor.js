import React from 'react';
import aboutTheAuthorPic from '../../images/michaelScharff.jpeg';

export default function AboutTheAuthor() {
	return (
		<div className="about-the-author">
			<img className="about-the-author__image" src={aboutTheAuthorPic} alt="Michael Scharff and his dog Shah" />
			<div className="about-the-author__container">
				<h2 className="about-the-author__title">About the author</h2>
				<p className="about-the-author__text">
					I'm <span className='about-the-author__text_bold'>Michael Scharff</span>, a 23 years old Israeli. After completing my IDF service as a platoon sergeant
					in 2021, I decided to become a full stack developer and completed a 10 months bootcamp at Practicum-100.
				</p>
				<p className="about-the-author__text">
					Now I'm looking to join a leading edge technological company as a junior full stack developer.
				</p>
				<p className="about-the-author__text">
					My better qualities are working hard, being a good person and a team player. I like playing chess,
					listening to music, playing the guitar and hiking - all that with my friends and family.
				</p>
				<p className="about-the-author__text">
					<br></br>
					You can call me on <a className='about-the-author__text' href='tel:+972585241224'><span className='about-the-author__text_bold'>+972-585241224</span></a> or email to <a className='about-the-author__text' href="mailto: minka.scharff@gmail.com">minka.scharff@gmail.com</a>
				</p>
			</div>
		</div>
	);
};
