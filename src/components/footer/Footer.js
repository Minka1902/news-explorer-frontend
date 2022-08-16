import FBLogo from '../../images/facebook_icon.svg';
import GHLogo from '../../images/github_icon.svg';

export default function Footer() {

  	return (
  		<div className="footer">
  			<p className="footer__text">&copy; 2021 Supersite, Powered by News API</p>
			<div className='footer__container'>
  				<div className="footer__container_links">
					  <a className="footer__link" href='#'>Home</a>
					  <a className="footer__link" href="https://practicum.com/en-isr/" rel="noopener noreferrer" target="_blank">Practicum by Yandex</a>
  				</div>
  				<div className="footer__container_icons">
					  <img className="footer__icon" src={GHLogo} alt="Git-Hub icon" />
					  <img className="footer__icon" src={FBLogo} alt="Facebook icon" />
  				</div>
			</div>
		</div>
  	);
}
