import React, {useState} from "react"
import {useNavigate}    from "react-router-dom";
import AuthServices     from "../../services/AuthServices"
import TextField        from "@material-ui/core/TextField"
import Button           from "@material-ui/core/Button"
import Snackbar         from "@material-ui/core/Snackbar"
import IconButton       from "@material-ui/core/IconButton"
import CloseIcon        from "@material-ui/icons/Close"
import "./Sign.css"

const authServices = new AuthServices()

const SignIn = () =>{
    const [userName,     setUserName]     = useState("");
    const [userNameFlag, setUserNameFlag] = useState(false);
    const [password,     setPassword]     = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [isOpen,       setIsOpen]       = useState(false);
    const [message,      setMessage]      = useState("");

    let navigate = useNavigate();

    const handleClose = (e, reason) =>{
        if(reason === "clickaway"){return}
        setIsOpen(false);
    }

    const handleChange = (e, setter) =>{
        const{value} = e.target
        setter(value);
    }

    const handleSignUp = () =>{
        navigate("/signUp");
    }

    const CheckIfAnyFieldIsEmpty = ()=>{
        setUserNameFlag(false)
        setPasswordFlag(false)

        if(userName === ""){
            setUserNameFlag(true);
        }

        if(password === ""){
            setPasswordFlag(true);
        }
    }

    const handleSubmit = () =>{
        CheckIfAnyFieldIsEmpty()
        if(userName !== "" && password !== ""){
            console.log("Acceptable")
            let data ={
                UserName: userName,
                Password: password,
            }
            console.log("Posted: ", data)

            authServices.SignIn(data)
                .then((data) =>{
                    console.log("Posted: ", data)
                    if(data.data.isSuccess){
                        navigate("/HomePage");
                    } else{
                        console.log("Something Went Wrong")
                        setIsOpen(true)
                        setMessage("Login Unsuccessfully")
                    }
                }).catch((error) =>{
                    console.log("Error : ", error)
                    setIsOpen(true)
                    setMessage("Something Went Wrong")
                })
        }else{
            console.log("Not Acceptable")
            setIsOpen(true)
            setMessage("Please Field Mandetory Field")
        }
    }

    return (
        <>
            <div className = "signContainer">
                <h1>Sign In</h1>
                <form className = "form">
                    <TextField className = "textField"
                                name      = "UserName"
                                label     = "UserName"
                                variant   = "outlined"
                                size      = "small"
                                error     ={userNameFlag}
                                value     ={userName}
                                onChange  ={(e) => handleChange(e, setUserName)}/>

                    <TextField className = "textField"
                                type      = "password"
                                name      = "Password"
                                label     = "Password"
                                variant   = "outlined"
                                size      = "small"
                                error     ={passwordFlag}
                                value     ={password}
                                onChange  ={(e) => handleChange(e, setPassword)}/>
                </form>
                <div className="buttons" style={{alignItems: "flex-start"}}>
                    <Button className = "button" onClick ={handleSignUp} color = "primary">
                        Sign Up
                    </Button>
                    <Button className = "button" onClick ={handleSubmit} color = "primary" variant = "contained">
                        Sign In
                    </Button>
                </div>
            </div>
            <Snackbar anchorOrigin     ={{
                          vertical:   "bottom",
                          horizontal: "left"
                      }}
                      open             ={isOpen}
                      autoHideDuration ={6000}
                      onClose          ={handleClose}
                      message          ={message}
                      action           ={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </>
                      }/>
        </>
    )
}

export default SignIn;