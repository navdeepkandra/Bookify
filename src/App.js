import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/Navbar.jsx";

// Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Listing from "./pages/Listing.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import ViewOrders from "./pages/ViewOrders.jsx";

// CSS
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ViewOrderDetails from "./pages/ViewOrderDetails.jsx";
import Logout from "./pages/Logout.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/list" element={<Listing />}/>
        <Route path="/books/view/:bookId" element={<Details />}/>
        <Route path="/books/orders" element={<ViewOrders />}/>
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="*" element={<h1 className="container mt-5">Coming Soon!</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
