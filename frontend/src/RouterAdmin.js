import { Route, Routes } from "react-router-dom";
import AdminUsers from "./pages/admin/AdminUsers";


export default function RouterAdmin() {
    return (
        <Routes>
            <Route path="/admin/users" element={<AdminUsers />} />


        </Routes>
    )
}