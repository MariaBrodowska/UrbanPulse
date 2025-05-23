import type React from "react";
import "./Login.css"
import registerImage from "../../assets/graph.webp"
function LoginHandleSumbit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.currentTarget.elements)

}
function DisplayLoginPage() {
    return <div id="loginpage">
        <div className="imgdiv">
            <img src={registerImage} className="logimg" alt="Login Image" />
        </div>
        <div className="logdiv">
            <h1>Login</h1>
            <form onSubmit={LoginHandleSumbit}>
                <label htmlFor="usernameInput">Email</label>
                <input type="text" id="usernameInput" />
                <label htmlFor="passwordInput">Password</label>
                <input type="password" id="passwordInput"/>
                <input type="submit" value="Login" />
            </form>
        </div>
    </div>
}
export default DisplayLoginPage;