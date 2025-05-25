import React from "react";
import { TokenContext, type TokenContextType } from "./login/Token"


function CheckToken() {
    const {token} = React.useContext(TokenContext) as TokenContextType;
    return (
        <div>
            <h1>Token: {token.token}</h1>
        </div>
        
    )
}
export default CheckToken;
