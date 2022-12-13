import React, {useState} from "react"
import AuthServices      from "../services/AuthServices.js"
import TextField         from "@material-ui/core/TextField"
import Button            from "@material-ui/core/Button"
import {useNavigate}     from "react-router-dom";
import Snackbar          from "@material-ui/core/Snackbar"
import IconButton        from "@material-ui/core/IconButton"
import CloseIcon         from "@material-ui/icons/Close"
import "./SignUp.css"

const authServices = new AuthServices()

const SignUp = (props) =>{
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

    const CheckValidity = () =>{
        console.log("Check Validity Calling")
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
    }

    const handleSubmit = () =>{
        CheckValidity();
        if(userName !== "" && password !== "" && confirmPassword !== ""){
            const data ={
                userName:       userName,
                password:       password,
                configPassword: confirmPassword,
            }

            authServices.SignUp(data)
                .then((data) =>{
                    console.log("data : ", data)
                    if(data.data.isSuccess){
                        navigate("/SignIn");
                    }else{
                        console.log("Sign Up Failed")
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
            console.log("Not Acceptable")
            setIsOpen(true);
            setMessage("Please Fill Required Field")
        }
    }
    
    const handleChange = (e, setter) =>{
        const{value} = e.target
        setter(value);
        // console.log("Name : ", name, "Value : ", value);
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
                               label     =  "UserName"
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
            <Snackbar anchorOrigin      = {{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      open              = {isOpen}
                      autoHideDuration  = {6000}
                      onClose           = {handleClose}
                      message           = {message}
                      action            = {
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                }
            />
        </>
    )
}

export default SignUp;

// export default class SignUp extends Component{
//     constructor(){
//       super()
//       this.state ={
//         UserName: "",
//         Password: "",
//         ConfirmPassword: "",
  
//         UserNameFlag: false,
//         PasswordFlag: false,
//         ConfirmPasswordFlag: false,
  
//         open: false,
//         Message: "",
//       }
//     }
  
//     handleClose = (e, reason) =>{
//       if(reason === "clickaway"){
//         return
//       }
//       this.setState({ open: false })
//     }
  
//     CheckValidity(){
//       console.log("Check Validity Calling")
//       //Reset Flag
//       this.setState({
//         UserNameFlag: false,
//         PasswordFlag: false,
//         ConfirmPasswordFlag: false,
//       })
  
//       if(this.state.UserName === ""){
//         this.setState({ UserNameFlag: true })
//       }
//       if(this.state.Password === ""){
//         this.setState({ PasswordFlag: true })
//       }
//       if(this.state.ConfirmPassword === ""){
//         this.setState({ ConfirmPasswordFlag: true })
//       }
//     }
  
//     handleSubmit = (e)=>{
//       this.CheckValidity()
//       if(
//         this.state.UserName !== "" &&
//         this.state.Password !== "" &&
//         this.state.ConfirmPassword !== ""
//       ){
//         const data ={
//           userName: this.state.UserName,
//           password: this.state.Password,
//           configPassword: this.state.ConfirmPassword,
//         }
  
//         authServices
//           .SignUp(data)
//           .then((data) =>{
//             console.log("data : ", data)
//             if(data.data.isSuccess){
//               this.props.history.push("/SignIn")
//             }else{
//               console.log("Sign Up Failed")
//               this.setState({ open: true, Message: "Sign Up Failed" })
//             }
//           })
//           .catch((error) =>{
//             console.log("error : ", error)
//             this.setState({ open: true, Message: "Something Went Wrong" })
//           })
//       }else{
//         console.log("Not Acceptable")
//         this.setState({ open: true, Message: "Please Fill Required Field" })
//       }
//     }
  
//     handleChange = (e)=>{
//       const{ name, value } = e.target
//       this.setState(
//        { [name]: value },
//         console.log("Name : ", name, "Value : ", value),
//       )
//     }
  
//     handleSignIn = (e)=>{
//       this.props.history.push("/SignIn")
//     }
  
//     render(){
//       console.log("state : ", this.state)
//       return (
//         <div className="SignUp-Container">
//           <div className="SignUp-SubContainer">
//             <div className="Header">Sign Up</div>
//             <div className="Body">
//               <form className="form">
//                 <TextField
//                   className="TextField"
//                   name="UserName"
//                   label="UserName"
//                   variant="outlined"
//                   size="small"
//                   error={this.state.UserNameFlag}
//                   value={this.state.UserName}
//                   onChange={this.handleChange}
//                 />
//                 <TextField
//                   className="TextField"
//                   type="password"
//                   name="Password"
//                   label="Password"
//                   variant="outlined"
//                   size="small"
//                   error={this.state.PasswordFlag}
//                   value={this.state.Password}
//                   onChange={this.handleChange}
//                 />
//                 <TextField
//                   className="TextField"
//                   type="password"
//                   name="ConfirmPassword"
//                   label="Confirm Password"
//                   variant="outlined"
//                   size="small"
//                   error={this.state.ConfirmPasswordFlag}
//                   value={this.state.ConfirmPassword}
//                   onChange={this.handleChange}
//                 />
//               </form>
//             </div>
//             <div className="Buttons">
//               <Button className="Btn" color="primary" onClick={this.handleSignIn}>
//                 Sign In
//               </Button>
//               <Button
//                 className="Btn"
//                 variant="contained"
//                 color="primary"
//                 onClick={this.handleSubmit}
//               >
//                 Sign Up
//               </Button>
//             </div>
//           </div>
//           <Snackbar
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//             open={this.state.open}
//             autoHideDuration={6000}
//             onClose={this.handleClose}
//             message={this.state.Message}
//             action={
//               <React.Fragment>
//                 <Button color="secondary" size="small" onClick={this.handleClose}>
//                   UNDO
//                 </Button>
//                 <IconButton
//                   size="small"
//                   aria-label="close"
//                   color="inherit"
//                   onClick={this.handleClose}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               </React.Fragment>
//             }
//           />
//         </div>
//       )
//     }
//   }
  