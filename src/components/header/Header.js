import * as React from 'react';
import NavBar from "../navBar/NavBar";
import NavMenu from "../navMenu/NavMenu";
import logo from "../../images/NewsExplorer-logo.svg";
import logoThemeDark from "../../images/NewsExplorer-theme-dark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import HeaderButton from './HeaderButton';
import openMenuIcon from '../../images/open-menu.svg';

export default function Header(props) {
	const { handleButtonClick, handleLogout, savedArticleClick, homeClick, isLoggedIn, theme, children } = props;
	const currentUser = React.useContext(CurrentUserContext);
	const [isNavBar, setIsNavBar] = React.useState(true);
	const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);

	// React.useEffect(()=>{
	// 	if (window.innerWidth > 703.5) {
	// 		setIsNavBar(true);
	// 	} else {
	// 		setIsNavBar(false);
	// 	}
	// }, []);

	return (
		<div className={`h-sb__container${theme? ' h-sb__container_no-background': ''}`}>
			<header className={`header${theme?' header_theme_dark':''} ${isNavBar? '' : ''}`}>
				<img className={`header__logo${theme?' header__logo_theme_dark':''}`} src={theme?logoThemeDark:logo} alt="News explorer logo" />
				{ isNavBar ?
					<NavBar theme={theme} savedArticleClick={savedArticleClick} homeClick={homeClick} isLoggedIn={isLoggedIn} />
					:
					<NavMenu isOpen={isNavMenuOpen}/>
				}
				{ isNavBar? // isNavBar
					<HeaderButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					:
					<button className={`header__button ${!isNavBar?'':'header__button_menu'} ${theme?' header__logo_theme_dark':''}`}>
						<img src={theme?openMenuIcon:openMenuIcon} alt="" />
					</button>
				}
			</header>
				{children}
		</div>
	);
  }
  