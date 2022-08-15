export default function NavBar(props) {
	const { isLoggedIn, savedArticleClick, homeClick, theme } = props;

	return (
		<div className={`nav-bar ${isLoggedIn?'':'nav-bar_reduced'}`}>
			<button className={`nav-bar__button${theme?' nav-bar__button_theme_dark':''}`} onClick={homeClick}>Home</button>
			{ isLoggedIn ? <button className={`nav-bar__button${theme?' nav-bar__button_theme_dark':''}`} onClick={savedArticleClick}>Saved articles</button> : <></>}
		</div>
	);
  }
  