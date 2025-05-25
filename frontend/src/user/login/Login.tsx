import React from "react";
import "./Login.css"
import registerImage from "../../assets/graph.webp"
import axios from "axios";
function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const LoginHandleSumbit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email == ""|| password == "") {
            return;
        }
        axios.post('http://urbanpulse-backend-1:5000/login', {
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
        <form onSubmit={LoginHandleSumbit}>
                <label htmlFor="emailInput">Email</label>
                <input type="text" id="emailInput" value={email} onChange={(event) => { setEmail(event.target.value) }}/>
                <label htmlFor="passwordInput">Password</label>
                <input type="password" id="passwordInput" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
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
            {LoginForm()}
            <p>If you do not have an account, <a href="/register">Sign up here</a></p>
        </div>
    </div>
}
export default DisplayLoginPage;