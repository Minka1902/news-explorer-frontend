import * as React from 'react';

export default function NavMenu(props) {
	const { isOpen, setIsOpen, isLoggedIn, homeClick, savedArticlesClick, children } = props;

	const handleHomeClick = () =>{
		homeClick();
		setIsOpen(false);
	}

	const handleSavedArticlesClick = () =>{
		savedArticlesClick();
		setIsOpen(false);
	}

	return (
		<>
			<div className={`nav-menu${isOpen?' nav-menu_opened':''}`}>
				<div className="nav-menu__container">
					<button className='nav-menu__button' onClick={handleHomeClick}>Home</button>
					{ 
					isLoggedIn ?
					<button className='nav-menu__button' onClick={handleSavedArticlesClick}>Saved articles</button>
					:
					<></>	
					}
				</div>
				{ children }
			</div>

			<div className={`overlay${isOpen?' overlay_opened':''}`}></div>
		</>
	);
  }