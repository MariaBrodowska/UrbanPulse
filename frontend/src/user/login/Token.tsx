import React from "react";
export interface Token {
    token: string
}
export type TokenContextType = {
    token: Token;
    overwriteToken: (token: string) => void;
}

export const TokenContext = React.createContext<TokenContextType | null>(null);

const TokenProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [token, setToken] = React.useState<Token>({token: "t"})
    const overwriteToken = (newToken: string) => {
        const newTokenObj: Token = {token: newToken}
        setToken(newTokenObj);
    }
    return (
    <TokenContext.Provider value={{ token, overwriteToken }}>
      {children}
    </TokenContext.Provider>
  );
}
export default TokenProvider;