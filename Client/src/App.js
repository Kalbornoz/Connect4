import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import NavBar from "./components/NavBar";
import ConnectFour from "./components/ConnectFour";
import HiScores from "./components/HiScores";
 
const App = () => {
 return (
   <div>
     <NavBar />
     <Routes>
       <Route exact path="/" element={<ConnectFour />} />
       <Route path="/hiscores" element={<HiScores />} />
     </Routes>
   </div>
 );
};
 
export default App;