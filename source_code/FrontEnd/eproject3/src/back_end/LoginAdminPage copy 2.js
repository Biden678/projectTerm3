// LoginAdminPage.js
import React from 'react';
import './assets/css/LoginAdminPage.css';

function LoginAdminPage(props) {
    return (
        <div>
            <input className="c-checkbox" type="checkbox" id="checkbox"/>
            <div className="c-formContainer">
                <form className="c-form" action="">
                    <input className="c-form__input" placeholder="Name" type="text" required />
                    <input className="c-form__input" placeholder="Password" type="password" required />
                    <label className="c-form__buttonLabel" htmlFor="checkbox">
                        <button className="c-form__button" type="button">Login</button>
                    </label>
                    <label className="c-form__toggle" htmlFor="checkbox" data-title="Login"></label>
                </form>
            </div>
        </div>
    );
}

export default LoginAdminPage;
