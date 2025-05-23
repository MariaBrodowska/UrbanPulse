import type React from "react";
import "./Register.css"
import registerImage from "../../assets/graph.webp"
function RegisterHandleSumbit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.currentTarget.elements)

}
function DisplayRegisterPage() {
    return <div id="registerpage">
        <div className="imgdiv">
            <img src={registerImage} className="regimg" alt="Registration Image" />
        </div>
        <div className="regdiv">
            <h1>Register</h1>
            <form onSubmit={RegisterHandleSumbit}>
                <label htmlFor="usernameInput">Email</label>
                <input type="text" id="usernameInput" />
                <label htmlFor="passwordInput">Password</label>
                <input type="password" id="passwordInput"/>
                <label htmlFor="passwordInput2">Repeat the password</label>
                <input type="password" id="passwordInput2"/>
                <input type="submit" value="Register" />
            </form>
        </div>
    </div>
}
export default DisplayRegisterPage;