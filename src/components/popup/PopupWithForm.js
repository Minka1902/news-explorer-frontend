import {Link} from 'react-router-dom';

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, handleSwitchPopup, buttonText, isOpen, onClose } = props;

	const handleLinkClick = () =>{
		onClose();
		handleSwitchPopup();
	}

	return (
	  <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
		<div className="popup__content">
		  <button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
		  <h2 className="popup__title">{title}</h2>
		  <form onSubmit={onSubmit} className={`form form_${name}`} name={name}>
			{children}
			<button type="submit" className="popup__button">
			  {buttonText}
			</button>
			<h3 className="popup__link">or <Link onClick={handleLinkClick} to={isOpen?"/signup":"/signin"} className="popup__link_blue">{linkText}</Link> </h3>
		  </form>
		</div>
	  </div>
	);
  }