import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Courses from "./pages/courses";
import Navbar from "./components/navbar";

function App() {
  return (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
    </Routes>
  </div>
);
}

export default App;