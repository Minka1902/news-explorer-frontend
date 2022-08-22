import * as React from 'react';
import NavBar from "../navBar/NavBar";
import NavMenu from "../navMenu/NavMenu";
import logo from "../../images/NewsExplorer-logo.svg";
import logoThemeDark from "../../images/NewsExplorer-theme-dark.svg";
import HeaderButton from './HeaderButton';
import openMenuIcon from '../../images/open-menu.svg';
import openMenuIconThemeDark from '../../images/open-menu-theme-dark.svg';
import headerCloseIcon from '../../images/header-close-icon.svg';

export default function Header(props) {
	const { handleButtonClick, isHomePage, handleLogout, handleNavBarClick, savedArticlesClick, homeClick, isLoggedIn, theme, children } = props;
	const [isNavBar, setIsNavBar] = React.useState(true);
	const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);

	const checkWindowDimensions = () => {
		if (window.innerWidth > 520) {
			setIsNavBar(true);
		} else {
			setIsNavBar(false);
		}
	};
	
	 React.useEffect(() => {
		 window.addEventListener('resize', checkWindowDimensions);
	 }, []);

	const toggleNavMenu = () => setIsNavMenuOpen(!isNavMenuOpen);

	const determineSrc = () => {
		if(theme){
			if(isNavMenuOpen){
				return headerCloseIcon;
			} else {
				return openMenuIconThemeDark;
			}
		}
		return openMenuIcon;
	}

	return (
		<div className={`h-sb__container${theme? ' h-sb__container_no-background': ''}`}>
			<header className={`header${theme?' header_theme_dark':''}${isNavMenuOpen?' header_darker':''}`}>
				<img className={`header__logo ${theme?'header__logo_theme_dark':''}${isNavMenuOpen?'_not':''}`} src={theme?logoThemeDark:logo} alt="News explorer logo" />
				{ isNavBar ?
					<NavBar isHomePage={isHomePage} handleNavBarClick={handleNavBarClick} theme={theme} savedArticlesClick={savedArticlesClick} homeClick={homeClick} isLoggedIn={isLoggedIn} />
					:
					<NavMenu isOpen={isNavMenuOpen} setIsOpen={setIsNavMenuOpen} isLoggedIn={isLoggedIn} savedArticlesClick={savedArticlesClick} homeClick={homeClick}>
						<HeaderButton isNavMenu={true} isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					</NavMenu>
				}
				{ isNavBar?
					<HeaderButton isLoggedIn={!isNavBar} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					:
					<button className={`header__button ${!isNavBar?'header__button_menu':''} ${theme?' header__logo_theme_dark':''}`} onClick={toggleNavMenu}>
						<img src={determineSrc()} alt="Menu icon" />
					</button>
				}
			</header>
			<div className={`overlay${isNavMenuOpen?' overlay_opened':''}`}></div>
			{children}
		</div>
	);
  }
  