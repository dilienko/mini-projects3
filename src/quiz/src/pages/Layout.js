import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { motion } from "framer-motion";
import { AppContext } from "..";
import { navLinksVariants } from "../utils/animateVariants";
import './styles/layout.css'



function Layout() {
    const {auth} = useContext(AppContext);
    const [isAuth, setIsAuth] = useState(null)
    const [isAuthLoading, setIsAuthLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsAuth(user)
            setIsAuthLoading(false)
        })

        return () => unsubscribe()
    }, [])

    
    
    const logout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            swal({title: "Failed to sign out. Try again", icon: 'error'})
        });
          
    }

    

    return(
        <>
            <header>
                <NavLink to='/' className='app-link'>Home</NavLink>
                {
                    isAuthLoading?
                    <ThreeDots height="16px" color="#fff" wrapperStyle={{marginRight: "5%"}}/> :
                    (isAuth)?
                    <motion.div initial="initial" animate="animate" variants={navLinksVariants}>
                       <NavLink to='/profile' className='app-link'>Profile</NavLink> 
                       <span className="link-separator">|</span>
                       <button 
                       onClick={logout}
                       className='app-link'>Log out</button>
                    </motion.div>
                    
                    :
                    <motion.div initial="initial" animate="animate" variants={navLinksVariants}>
                        <NavLink to='/login' className='app-link'>Sign in</NavLink>
                        <span className="link-separator">|</span>
                        <NavLink to='/registration' className='app-link'>Sign up</NavLink>
                    </motion.div>
                }
                
            </header>

            <main className="app">
                <Outlet />
            </main>

            
        </>
    )
    
}

export default Layout;