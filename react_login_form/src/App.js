import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlogs from "./components/createBlogs";

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path="/create" element={<CreateBlogs />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
