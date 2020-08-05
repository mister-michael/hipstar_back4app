import React from "react";
import { Card, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";
import dbAPI from "../../modules/dbAPI";
import "./LoginRegister.css";
import "./Auth.css"

const Login = props => {

    const handleLogin = (evt) => {
        const pwInput = document.getElementById("password");
        const unInput = document.getElementById("username");

        const loginObject = {
            username: unInput.value,
            password: pwInput.value
        };

        dbAPI.loginUser(loginObject).then(res => {
            props.setUser(res.id);
            props.history.push("/search");
        });
    };

    return (<>
        <div className="login-container" >
            <div className="login-div boxShadow">
                {/* <div className="blackText widthBig" > h ! p S t @ r </div> */}

                <div className="fields" >

                    <div className="username">
                        <input
                            type="text"
                            onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                            id="username"
                            className="user-input"
                            placeholder="username" />
                    </div>

                    <div className="username">

                        <input
                            type="password"
                            onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                            className="pass-input"
                            id="username"
                            placeholder="password" />
                    </div>

                    <button
                        type="submit"
                        onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                        className="signin-button"
                        onClick={handleLogin}>Submit</button>

                    <Link to="/register" style={{ textDecoration: 'none' }} className="justify-center registerLink" >
                        Don 't Have an Account?</Link>
                </div>

                {/* <CardFooter className="flex"> */}


                {/* </CardFooter> */}
            </div>
        </div>
    </>
    );
};

export default Login;