import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp                                   from "./components/SignUp"
import SignIn                                   from "./components/SignIn"
import HomePage                                 from "./components/HomePage"
import "./App.css"
import "./Reset.css";

const App = () =>{
    return(
        <div className="App">
            <Router>
                    <Routes>
                        <Route exact path = "/"         element = {<SignUp/>  }/>
                        <Route exact path = "/signup"   element = {<SignUp/>  }/>
                        <Route exact path = "/signin"   element = {<SignIn/>  }/>
                        <Route exact path = "/HomePage" element = {<HomePage/>}/>
                    </Routes>
            </Router>
        </div>
    )
}

export default App
