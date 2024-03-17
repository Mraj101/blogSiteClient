import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlogs from "./components/createBlogs";
import Navbar from "./components/Navbar"
import Signup from "./pages/signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext } from "./context/AuthProvider";
import SingleBlog from "./components/SingleBlog";
import Login from "./pages/login";
function App() {
  const {user} = useAuthContext(AuthContext)
  return (
    <Router>
      {user?<Navbar/>:""}
      <Routes>
        <Route index element={<Home />} />
        <Route 
        path="/create" 
        element={<CreateBlogs />}
        /> 
        <Route 
        path="/blog/:id"
        element={<SingleBlog/>}
        />
        
        <Route 
              path="/login" 
              element={<Login/>} 
            />
      </Routes>
    </Router>
  );
}

export default App;
