import * as React from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import signOutLogo from "../../images/sign-out-icon.svg";
import signOutLogoThemeDark from "../../images/sign-out-icon-theme-dark.svg";

export default function HeaderButton(props) {
	const { handleButtonClick, handleLogout, isLoggedIn, theme } = props;
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<>
			{ isLoggedIn ?
				<button className={`header__button${theme?' header__button_theme_dark':''}`} onClick={handleLogout}>
					{currentUser.name}<img src={theme?signOutLogoThemeDark:signOutLogo} alt="Sign out icon" />
				</button>	
				: 
				<button className={`header__button${theme?' header__button_theme_dark':''}`} onClick={handleButtonClick}>
					Sign in
				</button>
			}
		</>
	);
  }