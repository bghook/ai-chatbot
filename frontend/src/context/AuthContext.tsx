import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Handle states within the provider
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // We should run an effect code after the user moves on in the application
  // Verify if user's cookies are still there and still valid
  useEffect(() => {
    // Fetch if the user's cookies are valid, then skip login
  }, []);

  const login = async (email: string, password: string) => {};
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the context that should be used by the children components
export const useAuth = () => useContext(AuthContext);
