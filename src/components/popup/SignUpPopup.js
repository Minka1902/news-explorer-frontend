import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function SignUpPopup(props) {
  const { isOpen, onClose, handleSwitchPopup, onSubmit, buttonText, onPopupClick } = props;
  const [isValid, setIsValid] = React.useState(false);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isEmailCorrect, setIsEmailCorrect] = React.useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(true);
  const [shouldAddSSign, setShouldAddSSign] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('Password incorrect');
  const [isNameCorrect, setIsNameCorrect] = React.useState(true);

  // ! Reseting the popup when closing
  React.useEffect(() => {
    setIsEmailCorrect(true);
    setIsPasswordCorrect(true);
    setIsNameCorrect(true);
    setEmail('');
    setPassword('');
    setName('');
    setIsValid(false);
    setShouldAddSSign(false);
  }, [isOpen]);

  // ! Validating the email input
  const checkEmailValid = () => {
    // eslint-disable-next-line
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegExp.test(email)) {
      if (email.length >= 8) {
        setIsEmailCorrect(true);
      } else {
        setIsEmailCorrect(false);
      }
    } else {
      if (email === '') {
        setIsEmailCorrect(true);
      } else {
        setIsEmailCorrect(false);
      }
    }
  };

  // ! Validating the password input
  const checkPasswordValid = () => {
    const passwordRegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const passwordSpecialSignRegExp = /(?=.*[!@#$%^&*])/;
    if (passwordRegExp.test(password)) {
      if (!passwordSpecialSignRegExp.test(password)) {
        setPasswordErrorText('It`s better to add a special sign ( ! @ # $ % ^ & * ).');
        setShouldAddSSign(true);
      } else {
        setShouldAddSSign(false);
        setPasswordErrorText('Password incorrect.');
      }
      setIsPasswordCorrect(true);
    } else {
      setShouldAddSSign(false);
      setPasswordErrorText('Password incorrect.');
      if (password === '') {
        setIsPasswordCorrect(true);
      } else {
        setIsPasswordCorrect(false);
      }
    }
  };

  // ! Validating the name input
  const checkNameValid = () => {
    var nameRegExp = /^[a-zA-Z ]{2,40}$/;
    if (nameRegExp.test(name)) {
      setIsNameCorrect(true);
    } else {
      if (name === '') {
        setIsNameCorrect(true);
      } else {
        setIsNameCorrect(false);
      }
    }
  };

  // ! Validating the form
  React.useEffect(() => {
    checkEmailValid();
    checkPasswordValid();
    checkNameValid();
    if (isEmailCorrect || isPasswordCorrect || isNameCorrect) {
      if (isEmailCorrect && isPasswordCorrect && isNameCorrect) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
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
          autoComplete="off"
        />
        <p className={`popup__error-massage${isEmailCorrect ? '' : '_visible'}`}>Email incorrect.</p>
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
          autoComplete="off"
        />
        <p className={`popup__error-massage${isPasswordCorrect ? '' : '_visible'}${shouldAddSSign ? '_visible' : ''}`}>{passwordErrorText}</p>
        <h3 className='popup__input-title'>Username</h3>
        <input
          className="popup__input"
          onChange={(evt) => setName(evt.currentTarget.value)}
          placeholder="Enter your username"
          id="signup-username-input"
          type="text"
          name="usernameInput"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
        />
        <p className={`popup__error-massage${isNameCorrect ? '' : '_visible'}`}>Name incorrect.</p>
      </PopupWithForm>
    </div>
  );
}
