import "./Admin.css";
import { useContext, useEffect } from "react";
import { GeneralContext } from '../../App';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminUsers from "./AdminUsers";

import { IoAddOutline } from "react-icons/io5";
import AdminProducts from "./AdminProducts";


export default function About() {
    const { user, roleType, setUser, setRoleType, admin, setAdmin } = useContext(GeneralContext);


    return (
        <>
            <section id="admin-page" className='admin-page-body'>

                <h2>Admin</h2>
                <Tabs
                    defaultActiveKey="users"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >

                    <Tab eventKey="users" title="Users">
                        <AdminUsers />
                    </Tab>
                    <Tab eventKey="profile" title="Products">
                        <AdminProducts />
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}