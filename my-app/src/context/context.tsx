import { ReactNode, createContext, useState } from "react";
type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {
    null;
  },
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider: ({ children }: Props) => JSX.Element = ({
  children,
}: Props) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
