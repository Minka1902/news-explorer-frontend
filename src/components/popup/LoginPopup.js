import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function LoginPopup(props) {
  const { linkText, isOpen, handleSwitchPopup, isFound, handleLogin, onClose, buttonText } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(true);
  const [isEmailCorrect, setIsEmailCorrect] = React.useState(true);
  const [shouldAddSSign, setShouldAddSSign] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('Password incorrect');

  // ! submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleLogin(email, password);
      setIsValid(false);
    }
  };

  // ! Reseting the popup when closing
  React.useEffect(() => {
    setIsEmailCorrect(true);
    setIsPasswordCorrect(true);
    setEmail('');
    setPassword('');
    setIsValid(false);
    setShouldAddSSign(false);
  }, [isOpen]);

  // ! Validating the email input
  const checkEmailValid = () => {
    // eslint-disable-next-line
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegExp.test(email)) {
      setIsEmailCorrect(true);
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
    const passwordRegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
    if (password.length >= 6 || password === '') {
      if (passwordRegExp.test(password)) {
        setIsPasswordCorrect(true);
      } else {
        setShouldAddSSign(false);
        setPasswordErrorText('Password must contain letters and numbers!');
        if (password === '') {
          setIsPasswordCorrect(true);
        } else {
          setIsPasswordCorrect(false);
        }
      }
    } else {
      setIsPasswordCorrect(false);
      setPasswordErrorText('Password to short!');
    }
  };

  // ! Validating the form
  React.useEffect(() => {
    checkEmailValid();
    checkPasswordValid();
    if (isPasswordCorrect || isEmailCorrect) {
      if (isPasswordCorrect && isEmailCorrect) {
        if (email.length > 1 && password.length > 6) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [email, password]);

  return (
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
        value={email}
        onChange={(evt) => setEmail(evt.currentTarget.value)}
        autoComplete="off"
      />
      <p className={`popup__error-massage${isEmailCorrect ? '' : '_visible'}`}>Email incorrect</p>
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
        value={password}
        onChange={(evt) => setPassword(evt.currentTarget.value)}
      />
      <p className={`popup__error-massage${isPasswordCorrect ? '' : '_visible'}${shouldAddSSign ? '_visible' : ''}`}>{passwordErrorText}</p>
      <p className={`popup__error-massage${isFound ? '' : '_visible'}`}>User not found</p>
    </PopupWithForm>
  );
};
