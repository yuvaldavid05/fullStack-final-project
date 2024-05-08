import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import StruCategory from "./pages/category/StruCategory";
import WishList from "./pages/wish-list/WishList";
import ShoppingBasket from "./pages/shopping-basket/ShoppingBasket";
import ItemPage from "./pages/category/ItemPage";
import ContactUs from "./pages/contact-us/ContactUs";
import Login from "./pages/authorization/Login";
import SignUp from "./pages/authorization/SignUp";
import Admin from "./pages/admin/Admin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProductChange from "./pages/admin/AdminProductChange";
import OrderReceived from "./pages/shopping-basket/OrderReceived";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/products/:id" element={<ItemPage />} />
            <Route path="/wish-list" element={<WishList />} />
            <Route path="/shopping-basket" element={<ShoppingBasket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/products/category/:cat" element={<StruCategory />} />
            <Route path="/products" element={<StruCategory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products/:id" element={<AdminProductChange />} />
            <Route path="/succeeded" element={<OrderReceived />} />

            {/* <Route path="/admin/users" element={<AdminUsers />} /> */}


        </Routes>
    )
}