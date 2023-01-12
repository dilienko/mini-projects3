import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "..";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputError from "../components/InputError";
import swal from "sweetalert";



function Registration(){
    const {auth} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm({criteriaMode: "all"});
    const navigate = useNavigate()
    
    

    const onSubmit = data => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: `${data.name} ${data.surname}`, photoURL: "https://img.freepik.com/free-icon/cat_318-599485.jpg"
                })
                .then(() => {
                    setIsLoading(false)
                    swal({title: "You successfully registered", icon: "success"}).then(() => navigate('/login'))
                })
                .catch((error) => {
                    throw new Error(error)
                });
            })
            .catch(err => {
                setIsLoading(false)
                if(err.code === 'auth/email-already-in-use'){
                    swal({title: "Account with this email already exists", icon: "error"})
                }else{
                    swal({title: "An error occurred during registration. Try sign up later", icon: "error"})
                }
            })
    }

    return(
        <div className="app-content">
            <h1 className="form__header">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="First Name" 
                className="quiz-input"
                {...register('name', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: 'Can contains only latin letters'
                    }

                })}/>
                <InputError name='name' errors={errors}/>

                <input placeholder="Last Name" 
                className="quiz-input"
                {...register('surname', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: 'Can contains only latin letters'
                    }

                })}/>
                <InputError name='surname' errors={errors}/>


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

                <input placeholder="Create Password" 
                type="password"
                className="quiz-input"
                {...register('password', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                    validate: {
                        length: v => v.length >= 8 || 'Password must contain at least 8 characters',
                        capitalLetter: v => /[A-Z]+/.test(v) || 'Must contain at least 1 capital letter',
                        number: v => /[0-9]+/.test(v) || 'Must contain at least 1 number',
                        // specialChar: v => /[#?!@$*_-]+/.test(v) || 'Must contain at least 1 special symbol (#, ?, !, @, $, *, _, -)',
                        availableChars: v=> /^[A-Za-z\d#?!@$*_-]*$/.test(v) || 'Password can contain only leters, numbers and special symbols (#, ?, !, @, $, *, _, -)'
                    },
                })}/>
                <InputError name='password' errors={errors}/>

                <input placeholder="Confirm Password" 
                type="password"
                className="quiz-input"
                {...register('passwordConfirm', {
                    onChange: e => e.target.value = e.target.value.trim(),
                    required: 'This field is required',
                    validate: v => v === watch('password') || 'Passwords don`t match'
                })}/>
                <InputError name='passwordConfirm' errors={errors}/>

                

                <button className="quiz-button quiz-button_color_green form-btn">{
                    isLoading?
                    'Loading'
                    :
                    'Sign Up'
                }</button>
                
            </form>
        </div>
    )
}

export default Registration;