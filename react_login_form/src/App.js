import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlogs from "./components/createBlogs";
import Navbar from "./components/Navbar"
import Signup from "./pages/signup";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const {user} = useAuthContext()
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route 
        path="/create" 
        element={<CreateBlogs />}
        />
         {/* <Route 
              path="/login" 
              element={!user? <Signup/>:navigate('/login')} 
            />
        <Route 
              path="/signup" 
              element={!user? <Signup/>:navigate('/login')} 
            /> */}
      </Routes>
    </Router>
  );
}

export default App;
