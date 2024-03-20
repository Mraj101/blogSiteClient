import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlogs from "./components/createBlogs";
import Navbar from "./components/Navbar"
import Signup from "./pages/signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext } from "./context/AuthProvider";
import SingleBlog from "./components/SingleBlog";
import Login from "./pages/login";
import HomeLayout from "./pages/HomeLayout";
import Hero from "./pages/Hero";


function App() {
  const {user} = useAuthContext(AuthContext)
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route index element={<HomeLayout />} />
        <Route 
        path="/create" 
        element={<CreateBlogs />}
        /> 
        <Route 
        path="/blogs/:id"
        element={<SingleBlog/>}
        />
        
        <Route 
              path="/login" 
              element={<Login/>} 
            />
        <Route 
              path="/signup" 
              element={<Signup/>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
