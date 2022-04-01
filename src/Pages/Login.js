import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { checkEmailSenha } from '../Helpers';
import logo from '../images/logo.png';
import FooterLogin from '../Components/FooterLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const setLocalStorage = () => {
    let key = 'mealsToken';
    localStorage.setItem(key, '1');
    key = 'cocktailsToken';
    localStorage.setItem(key, '1');
    const objEmail = { email };
    key = 'user';
    localStorage.setItem(key, JSON.stringify(objEmail));
    history.push('/foods');
  };

  // useEffect(() => {
  //   const check = checkEmailSenha(email, senha);
  //   if (check) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [email, senha]);

  return (
    <>
      <form className="login">
        <img src={ logo } alt="Rango Recipes" />
        <input
          value={ email }
          data-testid="email-input"
          type="text"
          placeholder="Email..."
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          value={ senha }
          data-testid="password-input"
          type="password"
          placeholder="Senha..."
          onChange={ ({ target }) => setSenha(target.value) }
        />
        <button
          onClick={ setLocalStorage }
          // disabled={ disabled }
          data-testid="login-submit-btn"
          type="button"
        >
          Logar
        </button>
      </form>
      <FooterLogin />
    </>
  );
}

export default Login;
