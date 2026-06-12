import {Routes, Route} from "react-router-dom";
import {lazy,Suspense} from "react";
import Header from "./component/Header";

function App()
{
    const REG = lazy(()=>import ("./component/EmployeeRegister.jsx"));


    return(

        <>
        <Header/>
        <br></br>



        <Suspense Fallback={<div>Loading...</div>}>
        <Routes>
            <Route path= "/register" element={<REG/>} />
        </Routes>
        </Suspense>
        </>
    )
}
export default App;