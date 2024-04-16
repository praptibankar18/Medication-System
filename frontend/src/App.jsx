import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import MainDashboard from "./components/MainDashboard";
import ListPatients from "./components/patients/ListPatients";
import Login from "./components/practitioner/Login";
import Register from "./components/practitioner/Register";
import AddPatient from "./components/patients/AddPatient";
import ViewPatient from "./components/patients/ViewPatient";
import UpdatePatient from "./components/patients/UpdatePatient";
import ViewMedications from "./components/medications/ViewMedications";
import AddMedications from "./components/medications/AddMedications";
import UpdateMedication from "./components/medications/UpdateMedication";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/login" element={<Login />}>  </Route>
          <Route path="/logout" element={<Logout> <Login /> </Logout>}>  </Route>
          <Route path="/register" element={<Register />}>  </Route>

          <Route path="/" element={ <IsUserLogin> <MainDashboard> <ListPatients/> </MainDashboard></IsUserLogin> } />    
          <Route path="/add-patient/:practitioner_id" element={ <IsUserLogin> <MainDashboard> <AddPatient/> </MainDashboard></IsUserLogin> } />    
          <Route path="/view-patient/:patient_id" element={ <IsUserLogin> <MainDashboard> <ViewPatient/> </MainDashboard></IsUserLogin> } />    
          <Route path="/edit-patient/:patient_id" element={ <IsUserLogin> <MainDashboard> <UpdatePatient/> </MainDashboard></IsUserLogin> } />  

          <Route path="/view-medications/:patient_id" element={ <IsUserLogin> <MainDashboard> <ViewMedications/> </MainDashboard></IsUserLogin> } />  
          <Route path="/add-medication/:patient_id" element={ <IsUserLogin> <MainDashboard> <AddMedications/> </MainDashboard></IsUserLogin> } />  
          <Route path="/edit-medication/:medication_id" element={ <IsUserLogin> <MainDashboard> <UpdateMedication/> </MainDashboard></IsUserLogin> } />  
            


          

        </Routes>
      </BrowserRouter>
    </div>
  );

  
  function Logout({ children }) {
    const authToken = Cookies.get("auth_token");
    const practitioner_id = Cookies.get("practitioner_id");
    // console.log("auth token:", authToken);
    if (authToken) {
      Cookies.remove("auth_token");
      Cookies.remove("practitioner_id");
    }
    return children;
  }

  function IsUserLogin({ children }) {
    const authToken = Cookies.get("auth_token");
    console.log("auth token:", authToken);
    if (!authToken) {
      return <Navigate to="/login" replace />; // Redirect to Login on unauthorized access
    }

    return children;
  }
};



export default App;



