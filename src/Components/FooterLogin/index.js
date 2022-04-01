import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footerLogin">
        <h2>Desenvolvedores</h2>
        <ul>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/fabio-augusto-mazuchi/"
            >
              Fábio
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/adrian-martins-fadiga-72283321b/"
            >
              Adrian
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/washingtonlimaferreira/"
            >
              Washington
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/julio-cesar-fallace-filho-144a94b3/"
            >
              Julio
            </a>
          </li>
          <li>
            Leandro
          </li>
        </ul>
        {/* <p>
          Desenvolvido por
          <b> Fábio Augusto Mazuchi</b>
        </p>
        <div className="links">
          <div>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/FabioMazuchi"
            >
              <img alt="Github" src={ github } />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/fabio-augusto-mazuchi/"
            >
              <img alt="Linkedin" src={ linkedin } />
            </a>
          </div>
          <h4>mazuchi.augusto@hotmail.com</h4>
        </div> */}
      </footer>
    );
  }
}

export default Footer;
