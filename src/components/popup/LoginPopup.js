import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function LoginPopup(props) {
  const { linkText, isOpen, handleSwitchPopup, handleLogin, onClose, buttonText, onPopupClick } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  // ! submit
  const handleSubmit = () => {
    if(isValid){
      handleLogin()
    }
  };

  // ! Validating the form
  React.useEffect(() => {
    if (email.length > 10) {
      if (email.includes('@')) {
        if (password.length >= 8) {
          setIsValid(true);
        }
      }
    }
  }, [email, password]);

  return (
    <div onMouseDown={onPopupClick}>
      <PopupWithForm onSubmit={handleSubmit} isValid={isValid} handleSwitchPopup={handleSwitchPopup} linkText={linkText} name="login" title="Sign in" isOpen={isOpen} onClose={onClose} buttonText={buttonText}>
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
          onChange={(evt) => setEmail(evt.currentTarget.value)}
        />
        <h3 className='popup__input-title'>Password</h3>
        <input
          className="popup__input"
          placeholder="Enter password"
          id="login-password-input"
          type="password"
          name="passwordInput"
          required
          minLength="8"
          maxLength="200"
          onChange={(evt) => setPassword(evt.currentTarget.value)}
        />
      </PopupWithForm>
    </div>
  );
}
