import axios from "axios";
import { Routes, Route } from "react-router-dom";

import './App.css';
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from './context/UserContext';
import Account from "./pages/Account";
import Places from "./pages/Places";
import AddNewPlace from "./pages/AddNewPlace";
import PlacePage from "./pages/PlacePage";
import Bookings from './pages/Boookings';
import BookingPage from "./pages/BookingPage";

axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/account/places" element={<Places />}/>
                    <Route path="/account/places/new" element={<AddNewPlace />}/>
                    <Route path="/account/places/:id" element={<AddNewPlace />}/>
                    <Route path="/place/:id" element={<PlacePage />}/>
                    <Route path="/account/bookings/" element={<Bookings />}/>
                    <Route path="/account/bookings/:id" element={<BookingPage />}/>
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;