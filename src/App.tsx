import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/LoginPage";
import LoginStatus from "./components/LoginStatus/LoginStatus";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <LoginStatus />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
