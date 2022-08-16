import * as React from 'react';
import NavBar from "../navBar/NavBar";
import logo from "../../images/NewsExplorer-logo.svg";
import logoThemeDark from "../../images/NewsExplorer-theme-dark.svg";
import signOutLogo from "../../images/sign-out-icon.svg";
import signOutLogoThemeDark from "../../images/sign-out-icon-theme-dark.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header(props) {
	const { handleButtonClick, handleLogout, savedArticleClick, homeClick, isLoggedIn, theme } = props;
	const currentUser = React.useContext(CurrentUserContext);
	const [isNavBar, setIsNavBar] = React.useState(true);

	React.useEffect(()=>{
		if (window.innerWidth < 579.5) {
			setIsNavBar(true);
		} else {
			setIsNavBar(false);
		}
	}, []);

	return (
		<div className={`header${theme?' header_theme_dark':''}`}>
			<img className={`header__logo${theme?' header__logo_theme_dark':''}`} src={theme?logoThemeDark:logo} alt="News explorer logo" />
			<NavBar theme={theme} savedArticleClick={savedArticleClick} homeClick={homeClick} isLoggedIn={isLoggedIn} />
			{ isLoggedIn ?
				<button className={`header__button${theme?' header__button_theme_dark':''}`} onClick={handleLogout}>
					{currentUser.name}<img src={theme?signOutLogoThemeDark:signOutLogo} alt="Sign out icon" />
				</button>	
				: 
				<button className={`header__button${theme?' header__button_theme_dark':''}`} onClick={handleButtonClick}>
					Sign in
				</button>
			}
		</div>
	);
  }
  