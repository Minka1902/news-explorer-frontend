export default function NavBar(props) {
	const { isLoggedIn, savedArticlesClick, homeClick, theme, isHomePage } = props;

	return (
		<div className={`nav-bar ${isLoggedIn?'':'nav-bar_reduced'}`}>
			<button className={`nav-bar__button${isHomePage?'_active':''}${theme?'_theme_dark':''}`} onClick={homeClick}>Home</button>
			{ isLoggedIn ? <button className={`nav-bar__button${isHomePage?'':'_active'}${theme?'_theme_dark':''}`} onClick={savedArticlesClick}>Saved articles</button> : <></>}
		</div>
	);
  }
  