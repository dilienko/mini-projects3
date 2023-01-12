import {  updateProfile } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { motion } from 'framer-motion'
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { AppContext } from "..";
import UserTest from "../components/UserTest";
import './styles/profile.css'


function Profile() {
    
    const {auth, database} = useContext(AppContext)
    const [user, setUser] = useState(auth.currentUser)
    const [photo, setPhoto] = useState(auth.currentUser?.photoURL)
    const [isComplTestLoading, setIsComplTestLoading] = useState(false)
    const [isCreatedTestLoading, setIsCreatedTestLoading] = useState(false)
    const [tests, setTests] = useState([])
    const [createdTests, setCreatedTests] = useState([])
    const [testShown, setTestShown] = useState('complitedQuiz')
   

    useEffect(()=> {
        setUser(auth.currentUser)
    }, [auth.currentUser])

    const getTests = async () => {
        setIsComplTestLoading(true)
        const res = await getDocs(collection(database, `users/${auth.currentUser.uid}/tests`))
        const tests = [];
        res.forEach(test => {
            tests.push(test.data())
        })
        setTests(tests.sort((a, b) => b.date - a.date))
        setIsComplTestLoading(false)
    } 

    const getAuthorTest = async () => {
        setIsCreatedTestLoading(true)
        const res = await getDocs(collection(database, `users/${auth.currentUser.uid}/createdTests`))
        const tests = []
        res.forEach(doc => {
            const test = doc.data()
            const userAnswers = []
            
            getDocs(collection(database, `users/${auth.currentUser.uid}/createdTests/${test.id}/usersAnswer/`))
            .then(res => {
                res.forEach(userAnswer => {
                    userAnswers.push(userAnswer.data())
                })
            })
            .then(() => {
                tests.push({...test, userAnswers: userAnswers})
            })
        })
        setCreatedTests(tests.sort((a, b) => b.date - a.date))
        setIsCreatedTestLoading(false)
    }


   
    useEffect(() => {
        if(user) {
            getTests()
            getAuthorTest()
        }
    }, [user])

    const changePhoto = () => {
        swal({
            text: 'Paste a link to your image (.jpg, .jpeg, .png)',
            content: "input",
            button: 'Change photo'
        }).then(value => {
            if(value === null) return
            value = String(value).trim()
            if(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))/.test(value)){
                updateProfile(auth.currentUser, {
                    photoURL: value
                  }).then(() => {
                    setPhoto(value)
                    swal({title: 'Your profile photo was updated!', icon: "success"})
                  }).catch((error) => {
                    swal({title: 'Failed to update your profile photo', icon: 'error'})
                  });
            }else{
                swal({title: 'You entered an incorrect photo link', icon: 'error'})
            }
        })
    }
    


    return(
        <div className="app-content">
           
            <div className='user'>
                <div className="user__info">
                    <h1 className="user__name">{user.displayName}</h1>
                    <p className="user__email">{user.email}</p>
                </div>
                <div className="user__photo" key={photo}
                    style={{backgroundImage: `url(${photo})`}}>
                    
                    <motion.button
                    initial={{opacity:0}} whileHover={{opacity: 1, transition: {duration: 0.4}}}
                    onClick={changePhoto} 
                    >Change Photo</motion.button>
                </div>
            </div> 
            <div className="profile-link-wrapper">
                <NavLink to='/create-quiz' className="profile-link">&#9998; Create Quiz</NavLink>
            </div>
            <div className="profile-select">
                <span className={`profile-select__item ${testShown === "complitedQuiz"? 'active' : ''}`}
                onClick={() => setTestShown("complitedQuiz")}>Complited Quiz</span>

                <span className={`profile-select__item ${testShown === "createdQuiz"? 'active' : ''}`}
                onClick={() => setTestShown("createdQuiz")}>Created Quiz</span>      
            </div>
            <div className="tests">

                {
                    testShown === 'complitedQuiz'? 
                    <>{
                        isComplTestLoading? 
                        <ThreeDots 
                        height="80" 
                        width="80" 
                        color="violet"
                        wrapperClass="profile-loader"

                        />:
                        
                        tests.length > 0? 
                        
                        tests.map((test, index) => {
                            return(
                                <UserTest test={test} key={test.id} index={index} recursion={false} name={"test"}/>
                            )
                        })
                        
                       :
                        <div className="profile-not-found">You haven`t completed any quiz yet</div>
                    }</>

                    :

                    <>{
                        isCreatedTestLoading? 
                        <ThreeDots 
                        height="80" 
                        width="80" 
                        color="violet" 
                        wrapperClassName="profile-loader"
                        />:
                        
                        createdTests.length > 0? 
                        
                        createdTests.map((test, index) => {
                            return(
                                <UserTest test={test} key={test.id} index={index} recursion={true} name={"test"}/>
                            )
                        })
                        
                       :
                        <div className="profile-not-found">You haven`t created any quiz yet</div>
                    }</>

                }
                
            </div>
        </div>
    )
}

export default Profile;