import React, { useState } from "react";
import jAPI from "../../modules/apiManager";
import { Link } from "react-router-dom"
import { InputGroup, CardFooter, CardHeader, InputGroupAddon, Input, Card } from 'reactstrap';
import "./LoginRegister.css"

const RegisterForm = props => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        imgUrl: "",
        logoutTime: ""
    });

    const handleFieldChange = evt => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    };

    const handleRegister = () => {

        const emailArr = credentials.email.split("");
        const emailArrFind = emailArr.find(char => char === "@");

        const nameArr = credentials.username.split("");
        const nameArrFind = nameArr.find(char => char === " ");

        if (nameArrFind !== undefined) {
            window.alert("username can not contain spaces");
        } else if (emailArrFind === undefined) {
            window.alert("please enter a valid email address");
        } else if (nameArr.length > 16) {
            window.alert("username can not be more than 16 characters");

        } else {
            jAPI.get("users").then(users => {
                const name = users.find(user => user.username.toLowerCase() === credentials.username.toLowerCase());
                const email = users.find(user => user.email.toLowerCase() === credentials.email.toLowerCase());

                if (email === undefined && name === undefined) {

                    jAPI.save(credentials, "users")
                        .then(() =>

                            jAPI.get("users").then(users => {
                                const newUser = users.find(newUser => newUser.email.toLowerCase() === credentials.email.toLowerCase());
                                sessionStorage.setItem("userId", newUser.id);
                                props.setUser(credentials);
                                props.history.push("/search");
                            }));

                } else if (email !== undefined) {
                    window.alert("email already exists");

                } else if (name !== undefined) {
                    window.alert("username already exists");
                }
            });
        }

    };

    return (<>
        <div className="register" >
            <CardHeader className="headlineRed" > < h2 > Sign Up </h2></CardHeader >
            <Card className="registerCard" >
                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend" className="registerUsername">
                        username </InputGroupAddon>
                    <Input onChange={handleFieldChange}
                        onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                        type="username"
                        id="username"
                        className="registerUsername"
                        placeholder="" />
                </InputGroup> <br />
                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend" className="registerEmail">
                        email
                        </InputGroupAddon>
                    <Input
                        addonType="prepend"
                        onChange={handleFieldChange}
                        onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                        type="email"
                        id="email"
                        placeholder="" />
                </InputGroup> <br />
                <CardFooter >
                    < div className="rightAlign smallText" >
                        <Link to="/login" className="signLink" style={{ textDecoration: 'none' }} >
                            already a user ?</Link>
                    </div>
                </CardFooter >
            </Card>
        </div>
    </>
    );
};

export default RegisterForm;