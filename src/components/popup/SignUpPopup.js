import PopupWithForm from './PopupWithForm';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SignUpPopup(props) {
  const { isOpen, onClose, handleSwitchPopup, onSubmit, buttonText, onPopupClick } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [isValid, setIsValid] = React.useState(false);
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();

  // ! Validating the form
  React.useEffect(() => {
    if (email && password && name) {
      if (email.length > 10) {
        if (email.includes('@')) {
          if (password.length >= 8) {
            if (name.length >= 2) {
              setIsValid(true);
            } else {
              setIsValid(false);
            }
          }
        }
      }
    }
  }, [email, password, name]);

  return (
    <div onMouseDown={onPopupClick}>
      <PopupWithForm name="signup" isValid={isValid} title="Sign up" onSubmit={onSubmit} handleSwitchPopup={handleSwitchPopup} isOpen={isOpen} onClose={onClose} linkText="Sign in" buttonText={buttonText}>
        <h3 className='popup__input-title'>Email</h3>
        <input
          className="popup__input"
          onChange={(evt) => setEmail(evt.currentTarget.value)}
          placeholder="Enter email"
          id="signup-email-input"
          type="email"
          name="emailInput"
          required
          minLength="2"
          maxLength="40"
        />
        <h3 className='popup__input-title'>Password</h3>
        <input
          className="popup__input"
          onChange={(evt) => setPassword(evt.currentTarget.value)}
          placeholder="Enter password"
          id="signup-password-input"
          type="text"
          name="passwordInput"
          required
          minLength="2"
          maxLength="200"
        />
        <h3 className='popup__input-title'>Username</h3>
        <input
          className="popup__input"
          onChange={(evt) => setName(evt.currentTarget.value)}
          placeholder="Enter your username"
          id="username-confirm-input"
          type="text"
          name="usernameInput"
          required
          minLength="2"
          maxLength="200"
        />
      </PopupWithForm>
    </div>
  );
}
