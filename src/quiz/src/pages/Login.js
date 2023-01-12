import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "..";
import { signInWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';
import InputError from "../components/InputError";
import './styles/login.css'

function Login(){
    const {auth} = useContext(AppContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({criteriaMode: "all"});
    
    const onSubmit = (data) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => navigate('/profile'))
            .catch(err => {
                const error = err.code;
                if(error === 'auth/user-not-found'){
                    swal({title: 'You entered incorrect email', icon: 'error'})
                }else if (error === 'auth/wrong-password'){
                    swal({title: 'You entered incorrect password', icon: 'error'})
                }else{
                    swal({title: 'A login error occurred. Try logging in later', icon: 'error'})
                }
            })
            .finally( () => {
                setIsLoading(false)
            })
        
    }

    
    return(
        <div className="app-content">
            <h1 className="form__header">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" 
                className="quiz-input"
                {...register('email', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Incorrect email'
                    }

                })}/>
                <InputError name='email' errors={errors}/>

                <input placeholder="Password" 
                type="password"
                className="quiz-input"
                {...register('password', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                })}/>
                <InputError name='password' errors={errors}/>

                <button className="quiz-button quiz-button_color_green form-btn">{
                    isLoading?
                    'Loading'
                    :
                    'Sign In'
                }</button>
                
            </form>
        </div>
    )
}

export default Login;