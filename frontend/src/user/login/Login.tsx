import React from "react";
import "./Login.css"
import registerImage from "../../assets/graph.webp"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorlabel, setErrorLabel] = React.useState('Error')
    const [errorVisible, setErrorVisibility] = React.useState('hidden')
    const navigate = useNavigate();
    const LoginHandleSumbit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email == "" || password == "") {
            return;
        }
        axios.post('http://localhost:5000/api/users/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            setErrorVisibility("hidden")
            setErrorLabel("Success")
            navigate("/datasets");
        })
        .catch(function (error) {
            setErrorLabel(error.response.data)
            setErrorVisibility("showAlert")
        });

    }
    return (

        <form onSubmit={LoginHandleSumbit}>
            <p className={errorVisible}>{errorlabel}</p>
            <label htmlFor="emailInput">Email</label>
            <input type="text" id="emailInput" value={email} onChange={(event) => { setEmail(event.target.value) }} />
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id="passwordInput" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            <input type="submit" value="Login" />
        </form>
    )
}

function DisplayLoginPage() {
    return <div id="loginpage">
        <div className="imgdiv">
            <img src={registerImage} className="logimg" alt="Login Image" />
        </div>
        <div className="logdiv">
            <h1>Login</h1>
            <LoginForm />
            <p>If you do not have an account, <Link to="/register">Sign up here</Link></p>
        </div>
    </div>
}
export default DisplayLoginPage;
