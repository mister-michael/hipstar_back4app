import React from "react";
import { Card, CardHeader, CardFooter, CardBody} from 'reactstrap';
import { Link } from "react-router-dom";
import dbAPI from "../../modules/dbAPI";
import "./LoginRegister.css";

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
        <div className="loginContainer" >
            <Card className="loginCard boxShadow">
                <CardHeader className="headlineGreen blackText" > h ! p S t @ r </CardHeader>
                <CardBody >

                    <input
                        type="text"
                        onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                        id="username"
                        className="form-control"
                        placeholder="username" />

                    <input
                        type="password"
                        onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                        className="form-control"
                        id="password"
                        placeholder="password" />

                    <button
                        type="submit"
                        onKeyUp={evt => evt.key === "Enter" ? handleLogin() : null}
                        className="closeButtonColor marginTop"
                        onClick={handleLogin}>Submit</button>

                </CardBody>

                <CardFooter className="flex">

                    <Link to="/register" style={{ textDecoration: 'none' }} className="registerLink" >
                        Don 't Have an Account?</Link>

                </CardFooter>
            </Card>
        </div>
    </>
    );
};

export default Login;