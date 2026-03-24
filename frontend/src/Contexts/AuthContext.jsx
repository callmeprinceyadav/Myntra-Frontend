import {useState,createContext,useEffect} from 'react'
export const Context = createContext()

// eslint-disable-next-line react/prop-types
const AuthContext = ({children}) => {
  
    const [isAuth,setIsAuth] = useState(false)
    const [user,setUser] = useState("")
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const savedAuth = localStorage.getItem("isAuth");
        const savedUser = localStorage.getItem("user");
        if (savedAuth === "true" && savedUser) {
            setIsAuth(true);
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Error parsing user from localStorage", e);
            }
        }
    }, []);

    const login = (userData) => {
        setIsAuth(true);
        setUser(userData);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuth(false);
        setUser("");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
    };

  return (
    <Context.Provider value={{ isAuth, setIsAuth, user, setUser, totalItems, setTotalItems, login, logout }}>
    {children}
  </Context.Provider>
  )
}

export default AuthContext