import React, { useState } from "react";
import dbAPI from "../../modules/dbAPI";
import { Link } from "react-router-dom"
import "./LoginRegister.css"

const RegisterForm = props => {

    async function handleRegister() {

        const pwInput = document.getElementById("password");
        const unInput = document.getElementById("username");
        const emInput = document.getElementById("email");

        const registerObject = {
            username: unInput.value,
            email: emInput.value,
            password: pwInput.value
        };

        const emailArr = registerObject.email.split("");
        const emailArrFind = emailArr.find(char => char === "@");

        const nameArr = registerObject.username.split("");
        const nameArrFind = nameArr.find(char => char === " ");

        if (nameArrFind !== undefined) {
            window.alert("username can not contain spaces");
        } else if (emailArrFind === undefined) {
            window.alert("please enter a valid email address");
        } else if (nameArr.length > 16) {
            window.alert("username can not be more than 16 characters");

        } else {
            await dbAPI.signUpUser(registerObject).then(resp => {
                if (resp !== "error") {
                    props.setUser(resp.id)
                    props.history.push("/")
                }
            });
        };
    };

    return (<>

        <div className="login-container" >
            <div className="login-div boxShadow">
                <div className="fields" >
                    <div className="auth-header">reg!ster</div>
                    <div className="registerInstructions">
                        <div>please use a junk password</div>
                        <div>and remember it</div>
                        {/* <div>i'm not a security expert... yet</div> */}
                    </div>

                    <div className="email">
                        <input
                            type="text"
                            onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                            className="pass-input"
                            id="email"
                            placeholder="email" />
                    </div>

                    <div className="username">
                        <input
                            type="text"
                            onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                            id="username"
                            className="user-input"
                            placeholder="username" />
                    </div>

                    <div className="username">
                        <input
                            type="password"
                            onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                            className="pass-input"
                            id="password"
                            placeholder="password" />
                    </div>

                    <button
                        type="submit"
                        onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                        className="register-button"
                        onClick={handleRegister}>reg!ster</button>

                    <Link to="/login" style={{ textDecoration: 'none' }} className="justify-center registerLink" >
                        Already Have an Account?</Link>
                </div>
            </div>
        </div>


    </>
    );
};

export default RegisterForm;