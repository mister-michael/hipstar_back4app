import React, { useState } from "react";
import jAPI from "../../modules/apiManager";
import dbAPI from "../../modules/dbAPI";
import { Link } from "react-router-dom"
import { InputGroup, CardFooter, CardHeader, InputGroupAddon, Input, Card } from 'reactstrap';
import "./LoginRegister.css"

const RegisterForm = props => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
    });

    const handleFieldChange = evt => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value;
        setCredentials(stateToChange);
    };

    async function handleRegister() {

        const pwInput = document.getElementById("password");
        const unInput = document.getElementById("username");
        const emInput = document.getElementById("email");

        const registerObject = {
            username: unInput.value,
            email: emInput.value,
            password: pwInput.value
        }

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
            await dbAPI.signUpUser(registerObject).then(resp => {
                props.setUser(resp.id)
                props.history.push("/search")
            })
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
                </InputGroup> 

                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend" className="registerEmail">
                        email
                        </InputGroupAddon>
                    <Input
                        // addonType="prepend"
                        onChange={handleFieldChange}
                        onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                        type="email"
                        id="email"
                        placeholder="" />
                        
                </InputGroup> 

                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend" className="registerEmail">
                        password
                        </InputGroupAddon>

                            <Input
                                // addonType="prepend"
                                // onChange={handleFieldChange}
                                className="form-control"
                                onKeyUp={evt => evt.key === "Enter" ? handleRegister() : null}
                                type="password"
                                id="password"
                                placeholder="" />

                </InputGroup> 

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