import React, { useState, useEffect } from "react";
import {Card, Button, CardHeader,CardFooter,CardBody,InputGroup,InputGroupAddon,Input,InputGroupButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import { Link } from "react-router-dom";
import dbAPI from "../../modules/dbAPI"
import jAPI from "../../modules/apiManager";
import "./LoginRegister.css";

const Login = props => {
    const [credentials, setCredentials] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [symbol, setSymbol] = useState({ symbol: "@", placeholder: "username" });

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const handleAt = () => {
        setSymbol({ symbol: "@", placeholder: "username" });
    }

    const handleEmail = () => {
        setSymbol({ symbol: "email", placeholder: "email" });
    }

    const handleFieldChange = evt => {
        const stateToChange = { ...credentials };
        stateToChange[evt.target.id] = evt.target.value.toLowerCase();
        setCredentials(stateToChange);
    };
    const handleLogin = (evt) => {
        dbAPI.loginUser(credentials).then(res => {
            console.log(res, res.id)
            props.setUser(res.id)
            props.history.push("/search")
        })
        // jAPI.get("users")
        //     .then(users => {
        //         const user = users.find(user => (user.email.toLowerCase() === credentials.input.toLowerCase()) || (user.username.toLowerCase() === credentials.input.toLocaleLowerCase()))
        //         if (user !== undefined) {
        //             sessionStorage.setItem("userId", user.id)
        //             props.setUser(credentials)
        //             props.history.push("/profile")
        //         } else {
        //             window.alert("try again")
        //         }
        //     });
    };

    useEffect(() => {

    }, []);

    return (<>
        <div className="loginContainer" >
            <Card className="loginCard boxShadow">
                <CardHeader className="headlineGreen blackText" > h ! p S t @ r </CardHeader>
                <CardBody >
                    {/* <InputGroup className="marginTopSmall">
                        <InputGroupAddon addonType="prepend" >
                            <InputGroupButtonDropdown addonType="append"
                                isOpen={dropdownOpen}
                                toggle={toggleDropDown} >
                                <DropdownToggle caret > {symbol.symbol} </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem id="atDropDown"
                                        onClick={handleAt} >
                                        @ </DropdownItem>
                                    <DropdownItem id="emailDropDown"
                                        onClick={handleEmail} > email
                                         </DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </InputGroupAddon>
                        <Input placeholder={symbol.placeholder}
                            onChange={handleFieldChange}
                            onKeyUp={evt => evt.key === "Enter" ? handleLogin(evt) : null}
                            type="input"
                            id="input" />
                        <InputGroupAddon addonType="append" >
                            <Button onClick={handleLogin} > sign in </Button>
                        </InputGroupAddon>
                    </InputGroup> */}
                    <input type="text" id="username" placeholder="username" onKeyUp={handleFieldChange}/>
                    <input type="text" id="password" placeholder="password" onKeyUp={handleFieldChange}/>
                    <button type="submit" onClick={handleLogin}>Submit</button>
                </CardBody>
                <CardFooter className="flex">
                    <Link to="/register" style={{ textDecoration: 'none' }} className="registerLink" >
                        Don 't Have an Account?
                            </Link>
                </CardFooter>
            </Card>
        </div>
    </>
    );
};

export default Login;