import "./Register.css"
import registerImage from "../../assets/graph.webp"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegistrationForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [errorlabel, setErrorLabel] = React.useState('Click the button below to register')
    const [errorVisible, setErrorVisibility] = React.useState('')
    const navigate = useNavigate();
    const checkPassword = (target: HTMLInputElement) => {
        setPassword2(target.value)
        if (target.value != password || target.value == "") {
            target.style = "border-color: red;"
        } else {
            target.style = "";
        }
    }
    const handleErrorLabel = () => {
        let allErrors: string = ""
        if(email == "") {
            allErrors += "Email must not be empty. "
        }
        if(password == "") {
            allErrors += "Password must not be empty. "
        }
        if(password2 != password) {
            allErrors += "Passwords must match. "
        }
        if(allErrors != "") {
            setErrorLabel(allErrors)
            setErrorVisibility("showAlert")
            return true;
        } else {
            setErrorLabel('Click the button below to register')
            setErrorVisibility("")
            return false;
        }
        
    }
    const checkBlank = (target: HTMLInputElement) => {
        if (target.value == "") {
            target.style = "border-color: red;"
        } else {
            target.style = "";
        }
    }
    const registerHandleSumbit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(handleErrorLabel()) {
            return;
        }
        axios.post('http://localhost:5000/api/users/register', {
            email: email,
            password: password
        })
       .then(function (response) {
            setErrorVisibility("")
            setErrorLabel("Success")
            navigate("/login");
        })
        .catch(function (error) {
            const err: string = JSON.stringify(error.response.data.errors)
            setErrorLabel(err)
            setErrorVisibility("showAlert")
        });
    }

    return (
        <form onSubmit={registerHandleSumbit}>
            <label htmlFor="emailInput">Email</label>
            <input type="text" id="emailInput" value={email} onChange={(event) => { setEmail(event.target.value) }} onBlur={(event) => { checkBlank(event.target) }} />
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id="passwordInput" value={password} onChange={(event) => { setPassword(event.target.value) }} onBlur={(event) => { checkBlank(event.target) }} />
            <label htmlFor="passwordInput2">Repeat the password</label>
            <input type="password" id="passwordInput2" value={password2} onChange={(event) => { checkPassword(event.target) }} onBlur={(event) => { checkPassword(event.target) }} />
            <label htmlFor="regsubmit" id="errorLabel" className={errorVisible}>{errorlabel}</label>
            <input id="regsubmit" type="submit" value="Register" />
        </form>
    )
}

function DisplayRegisterPage() {
    return <div id="registerpage">
        <div className="imgdiv">
            <img src={registerImage} className="regimg" alt="Registration Image" />
        </div>
        <div className="regdiv">
            <h1>Register</h1>
            {RegistrationForm()}
        </div>
    </div>
}
export default DisplayRegisterPage;
