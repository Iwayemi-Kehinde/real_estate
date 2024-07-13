import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import CreateListing from "./pages/CreateListing"
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
