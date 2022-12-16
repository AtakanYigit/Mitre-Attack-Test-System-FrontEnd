import React, {useState} from "react"
import {useNavigate}     from "react-router-dom";
import AuthServices      from "../../services/AuthServices.js"
import TextField         from "@material-ui/core/TextField"
import Button            from "@material-ui/core/Button"
import Snackbar          from "@material-ui/core/Snackbar"
import IconButton        from "@material-ui/core/IconButton"
import CloseIcon         from "@material-ui/icons/Close"
import "./Sign.css"

const authServices = new AuthServices()

const SignUp = () =>{
    const [userName,            setUserName]            = useState("");
    const [password,            setPassword]            = useState("");
    const [confirmPassword,     setConfirmPassword]     = useState("");
    const [userNameFlag,        setUserNameFlag]        = useState(false);
    const [passwordFlag,        setPasswordFlag]        = useState(false);
    const [confirmPasswordFlag, setConfirmPasswordFlag] = useState(false);
    const [isOpen,              setIsOpen]              = useState(false);
    const [message,             setMessage]             = useState("");

    let navigate = useNavigate();

    const handleClose = (e, reason) =>{
        if(reason === "clickaway"){
            return
        }
        setIsOpen(false);
    }

    const CheckInputFileds = () =>{
        setUserNameFlag(false);
        setPasswordFlag(false);
        setConfirmPasswordFlag(false);

        if(userName === ""){
            setUserNameFlag(true);
        }

        if(password === ""){
            setPasswordFlag(true);
        }

        if(confirmPassword === ""){
            setConfirmPasswordFlag(true);
        }

        if(password !== confirmPassword){
            setPasswordFlag(true);
            setConfirmPasswordFlag(true);
            setIsOpen(true);
            setMessage("Passwords Don't Match");
            return false;
        }else{
            return true;
        }
    }

    const handleSubmit = () =>{
        if(CheckInputFileds()){
            if(userName !== "" && password !== "" && confirmPassword !== ""){
                const data ={
                    UserName:       userName,
                    Password:       password
                }

                authServices.SignUp(data)
                    .then((data) =>{
                        console.log("data : ", data)
                        if(data.data.isSuccess){
                            navigate("/HomePage");
                        }else{
                            setIsOpen(true);
                            setMessage("Sign Up Failed")
                        }
                    })
                    .catch((error) =>{
                        console.log("error : ", error)
                        setIsOpen(true);
                        setMessage("Something Went Wrong")
                    })
            }else{
                setIsOpen(true);
                setMessage("Please Fill Required Field");
            }
        }
    }
    
    const handleChange = (e, setter) =>{
        const{value} = e.target
        setter(value);
    }

    const routeToSignIn = () =>{
        navigate("/SignIn");
    }

    return (
        <>
            <div className="signContainer">
                <h1>Sign Up</h1>
                <form className="form">
                    <TextField className =  "textField"
                               name      =  "UserName"
                               label     =  "Name"
                               variant   =  "outlined"
                               size      =  "small"
                               error     =  {userNameFlag}
                               value     =  {userName}
                               onChange  =  {(e) => handleChange(e, setUserName)}/>
                               
                    <TextField className = "textField"
                               type      =  "password"
                               name      =  "Password"
                               label     =  "Password"
                               variant   =  "outlined"
                               size      =  "small"
                               error     =  {passwordFlag}
                               value     =  {password}
                               onChange  = {(e)=> handleChange(e, setPassword)}/>
                               
                    <TextField className = "textField"
                               type      = "password"
                               name      = "ConfirmPassword"
                               label     = "Confirm Password"
                               variant   = "outlined"
                               size      = "small"
                               error     = {confirmPasswordFlag}
                               value     = {confirmPassword}
                               onChange  = {(e)=> handleChange(e, setConfirmPassword)}/>
                </form>
                <div className = "buttons">
                    <Button className = "button" onClick = {routeToSignIn} color = "primary">
                        Sign In
                    </Button>
                    <Button className = "button" onClick = {handleSubmit}  color = "primary" variant = "contained">
                        Sign Up
                    </Button>
                </div>
            </div>
            <Snackbar anchorOrigin     = {{vertical: "bottom", horizontal: "left"}}
                      open             = {isOpen}
                      autoHideDuration = {6000}
                      onClose          = {handleClose}
                      message          = {message}
                      action           = {
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                      }/>
        </>
    )
}

export default SignUp;