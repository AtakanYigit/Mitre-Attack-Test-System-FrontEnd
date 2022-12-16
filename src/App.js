import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp                                   from "./components/SignInSignUpPages/SignUp"
import SignIn                                   from "./components/SignInSignUpPages/SignIn"
import HomePage                                 from "./components/HomePage/HomePage"
import BruteForceTests                          from "./components/BruteForceTests/BruteForceTests"
import "./App.css"
import "./Reset.css";

const App = () =>{
    return(
        <div className="App">
            <Router>
                    <Routes>
                        <Route exact path = "/"                element = {<SignUp/>  }/>
                        <Route exact path = "/signup"          element = {<SignUp/>  }/>
                        <Route exact path = "/signin"          element = {<SignIn/>  }/>
                        <Route exact path = "/HomePage"        element = {<HomePage/>}/>
                        <Route exact path = "/BruteForceTests" element = {<BruteForceTests/>}/>
                        <Route exact path = "/SecondShit"      element = {<HomePage/>}/>
                    </Routes>
            </Router>
        </div>
    )
}

export default App
