import PopupWithForm from './PopupWithForm';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SignUpPopup(props) {
  const { isOpen, onClose, handleSwitchPopup, onUpdateUser, buttonText, onPopupClick } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();
  
  React.useEffect(() => {
    if (currentUser.name && currentUser.password) {
      setName(currentUser.name);
      setPassword(currentUser.password);
      setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ email: email, password: password, name: name});
  };

  return (
      <div onMouseDown={onPopupClick}>
        <PopupWithForm name="signup" title="Sign up" onSubmit={handleSubmit} handleSwitchPopup={handleSwitchPopup} isOpen={isOpen} onClose={onClose} linkText="Sign in" buttonText={buttonText}>
          <h3 className='popup__input-title'>Email</h3>
          <input
            className="popup__input"
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
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
            onChange={(event) => setName(event.target.value)}
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
