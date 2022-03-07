import React from 'react';

function Login() {
  return (
    <form>
      <input data-testid="email-input" type="text" placeholder="Email..." />
      <input data-testid="password-input" type="password" placeholder="Senha..." />
      <button data-testid="login-submit-btn" type="button">Enter</button>
    </form>
  );
}

export default Login;
