import {Link} from 'react-router-dom';
import * as React from 'react';

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, isValid, setIsValid, handleSwitchPopup, buttonText, isOpen, onClose } = props;

	// ! Switching between popups
	const handleLinkClick = () =>{
		onClose();
		handleSwitchPopup();
	}

	// ! Reseting the form
	React.useEffect(() => {
		const form = document.querySelector(`.form-${name}`);
		form.reset();
	}, [isOpen, name]);
	
	return (
	  <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
		<div className="popup__content">
		  <button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
		  <h2 className="popup__title">{title}</h2>
		  <form onSubmit={onSubmit} className={`popup__form form-${name}`} name={name}>
			{children}
			<button type="submit" className={`popup__button${isValid ? '' : '_invalid'}`}>
			  {buttonText}
			</button>
			<h3 className="popup__link-text">or <Link onClick={handleLinkClick} to={isOpen?"/signup":"/signin"} className="popup__link">{linkText}</Link> </h3>
		  </form>
		</div>
	  </div>
	);
  }