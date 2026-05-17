import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./Pages/Home/Home"


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/"  exact={true} element={<Home/>} />
          <Route path="/help" exact={true} element={<div>Help Center Page</div>} />
          <Route path="/track" exact={true} element={<div>Order Tracking Page</div>} />
        </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
