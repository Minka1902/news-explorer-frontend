import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function LoginPopup(props) {
  const { linkText, isOpen, handleSwitchPopup, onClose, onAddPlaceSubmit, buttonText, onPopupClick } = props;
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlaceSubmit({ name: cardName, link: cardLink });
  };

  return (
    <div onMouseDown={onPopupClick}>
      <PopupWithForm onSubmit={handleSubmit} handleSwitchPopup={handleSwitchPopup} linkText={linkText} name="login" title="Sign in" isOpen={isOpen} onClose={onClose} buttonText={buttonText}>
      <h3 className='popup__input-title'>Email</h3>
          <input
            className="popup__input"
            placeholder="Enter email"
            id="login-email-input"
            type="email"
            name="emailInput"
            required
            minLength="2"
            maxLength="40"
          />
         <h3 className='popup__input-title'>Password</h3>
          <input
            className="popup__input"
            placeholder="Enter password"
            id="login-password-input"
            type="password"
            name="passwordInput"
            required
            minLength="2"
            maxLength="200"
          />
      </PopupWithForm>
    </div>
  );
}
