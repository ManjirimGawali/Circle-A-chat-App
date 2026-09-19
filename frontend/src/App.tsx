import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboars";
import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoutes";
import "./App.css";
function App() {
   return (
        

            <Routes>

                {/* Public route */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>

            </Routes>

    );
}

export default App;