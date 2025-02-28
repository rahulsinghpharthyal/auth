import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// apiSlices:-
import { useAuthenticateQuery } from "./features/authenticate/authenticateApiSlice";

//Pages:-
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MainLayout from "./pages/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
 const a = useAuthenticateQuery();
  console.log(a)
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
