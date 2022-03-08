import React, { useState, useEffect } from 'react';
import NUMBER_6 from '../data';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [disabled, setDisabled] = useState(true);

  const checkEmailSenha = () => {
    const valid = /\S+@\S+\.\S+/;
    const check = valid.test(email);
    if (check && senha.length > NUMBER_6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const logar = () => {
    let key = 'mealsToken';
    localStorage.setItem(key, '1');
    key = 'cocktailsToken';
    localStorage.setItem(key, '1');
    console.log('logado');
  };

  useEffect(() => {
    checkEmailSenha();
  }, [email, senha]);

  return (
    <form>
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
        onClick={ logar }
        disabled={ disabled }
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
