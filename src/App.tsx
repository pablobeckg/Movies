import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/LoginPage";
import LoginStatus from "./components/LoginStatus/LoginStatus";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <LoginStatus />
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<PrivateRoute />} >
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
