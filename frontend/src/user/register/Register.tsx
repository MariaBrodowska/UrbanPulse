import "./Register.css"
import registerImage from "../../assets/graph.webp"
import React from "react";
import axios from "axios";
function RegistrationForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const checkPassword = (target: HTMLInputElement) => {
        setPassword2(target.value)
        if (target.value != password || target.value == "") {
            target.style = "border-color: red;"
        } else {
            target.style = "";
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
        if (email == "" || password2 != password || password == "") {
            return;
        }
        axios.post('http://urbanpulse-backend-1:5000/register', {
            Email: email,
            Password: password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form onSubmit={registerHandleSumbit}>
            <label htmlFor="emailInput">Email</label>
            <input type="text" id="emailInput" value={email} onChange={(event) => { setEmail(event.target.value) }} onBlur={(event) => { checkBlank(event.target) }} />
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id="passwordInput" value={password} onChange={(event) => { setPassword(event.target.value) }} onBlur={(event) => { checkBlank(event.target) }} />
            <label htmlFor="passwordInput2">Repeat the password</label>
            <input type="password" className="alert" id="passwordInput2" value={password2} onChange={(event) => { checkPassword(event.target) }} onBlur={(event) => { checkPassword(event.target) }} />
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