import React from "react";
import "./Login.css"
import registerImage from "../../assets/graph.webp"
import axios from "axios";
import { Link } from "react-router-dom";
import { TokenContext, type TokenContextType } from "./Token";
function LoginForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {token, overwriteToken} = React.useContext(TokenContext) as TokenContextType;
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
                console.log(response);
                console.log(response.data.token)
                overwriteToken(response.data.token)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (

        <form onSubmit={LoginHandleSumbit}>
            <label htmlFor="emailInput">Email</label>
            <input type="text" id="emailInput" value={email} onChange={(event) => { setEmail(event.target.value) }} />
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id="passwordInput" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            <input type="submit" value="Login" />
            <label>{token.token}</label>
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