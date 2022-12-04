import { Link } from 'react-router-dom';
import * as React from 'react';
import Preloader from "../preloader/Preloader.js";

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, isValid, handleSwitchPopup, buttonText, isOpen, onClose, isPreloader=true, preloaderText } = props;

	// ! Switching between popups
	const handleLinkClick = () => {
		onClose();
		handleSwitchPopup();
	}

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__content">
				<button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
				<h2 className="popup__title">{title}</h2>
				<form onSubmit={onSubmit} className={`popup__form form-${name}`} name={name}>
					{/* once the login was succesful the preloader will stop */}
					{isPreloader ? <Preloader text={preloaderText} /> : children}
					<button type="submit" className={`popup__button${isValid ? '' : '_invalid'}`}>
						{buttonText}
					</button>
					<h3 className="popup__link-text">or <Link onClick={handleLinkClick} to={buttonText === 'Sign in' ? "/signup" : "/signin"} className="popup__link">{linkText}</Link> </h3>
				</form>
			</div>
		</div>
	);
}
