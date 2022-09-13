import FBLogo from '../../images/facebook_icon.svg';
import GHLogo from '../../images/github_icon.svg';

export default function Footer(props) {
	const githubClick = (evt) => {
		if((!evt.target.classList.contains("article__saved")) && (!evt.target.classList.contains("article__delete_active"))){
			window.open("https://github.com/Minka1902", '_blank', 'noopener,noreferrer');
		}
	};

	const facebookClick = (evt) => {
		if(!evt.target.classList.contains("footer__icon")){
			window.open("https://facebook.com", '_blank', 'noopener,noreferrer');
		}
	};
	
  	return (
  		<footer className="footer">
  			<p className="footer__text">&copy; 2021 Supersite, Powered by News API</p>
			<div className='footer__container'>
  				<div className="footer__container-links">
    {/* eslint-disable-next-line */}
					  <a className="footer__link" href='#' onClick={props.homeClick}>Home</a>
					  <a className="footer__link" href="https://practicum.com/en-isr/" rel="noopener noreferrer" target="_blank">Practicum</a>
  				</div>
  				<div className="footer__container-icons">
					  <img className="footer__icon" src={GHLogo} alt="Git-Hub icon" onClick={githubClick} />
					  <img className="footer__icon" src={FBLogo} alt="Facebook icon" onClick={facebookClick} />
  				</div>
			</div>
		</footer>
  	);
}
