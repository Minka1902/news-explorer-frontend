import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function LoginPopup(props) {
  const { linkText, isOpen, handleSwitchPopup, handleLogin, onClose, buttonText, onPopupClick } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(true);
  const [shouldAddSSign, setShouldAddSSign] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('Password incorrect');
  const [isEmailCorrect, setIsEmailCorrect] = React.useState(true);

  // ! submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleLogin(email, password);
      setIsValid(false);
    }
  };

  // ! Closing the popup
  const closeClick = () => {
    onClose();
    setIsEmailCorrect(true);
    setIsPasswordCorrect(true);
    setEmail('');
    setPassword('');
    setIsValid(false);
  }

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
    const passwordRegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const passwordSpecialSignRegExp = /(?=.*[!@#$%^&*])/;
    if (passwordRegExp.test(password)) {
      if(!passwordSpecialSignRegExp.test(password)){
        setPasswordErrorText('It`s better to add a special sign ( ! @ # $ % ^ & * ).');
        setShouldAddSSign(true);
      } else{
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

  // ! Validating the form
  React.useEffect(() => {
    if (checkEmailValid() || checkPasswordValid()) {
      if (checkEmailValid() && checkPasswordValid()) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [email, password]);

  return (
    <div onMouseDown={onPopupClick}>
      <PopupWithForm onSubmit={handleSubmit} isValid={isValid} handleSwitchPopup={handleSwitchPopup} linkText={linkText} name="login" title="Sign in" isOpen={isOpen} onClose={closeClick} buttonText={buttonText}>
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
          onChange={(evt) => setPassword(evt.currentTarget.value)}
        />        
        <p className={`popup__error-massage${isPasswordCorrect ? '' : '_visible'}${shouldAddSSign ? '_visible' : ''}`}>{passwordErrorText}</p>
      </PopupWithForm>
    </div>
  );
}
