import { BrowserRouter , Routes, Route }  from "react-router-dom";
import App from "./App";
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import ProtectedRoute from "./authenRoute"


const MyRoute = ()=>{

    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/blog/:slug" element={<SingleComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                 
                <Route
                    path="/create"
                    element={
                    <ProtectedRoute>
                        <FormComponent />
                    </ProtectedRoute>
                    }
                /> 
                <Route
                    path="/blog/edit/:slug"
                    element={
                    <ProtectedRoute>
                        <EditComponent />
                    </ProtectedRoute>
                    }
                />           
            </Routes>
        </BrowserRouter>
  );
}   

export default MyRoute;