import "./Admin.css";
import { useContext, useEffect } from "react";
import { GeneralContext } from '../../App';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import RouterAdmin from "../../RouterAdmin";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminUsers from "./AdminUsers";

import { IoAddOutline } from "react-icons/io5";


export default function About() {
    const { user, roleType, setUser, setRoleType, admin, setAdmin } = useContext(GeneralContext);


    return (
        <>
            <Button>
                <Link to="/" >
                    back
                </Link>
            </Button>
            <section id="admin-page" className='admin-page-body'>
                <div className='icon-add'>
                    <IoAddOutline />
                </div>
                <p>admin</p>
                <Tabs
                    defaultActiveKey="users"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >

                    <Tab eventKey="users" title="Users">
                        {/* Tab content for Home */}
                        <AdminUsers />
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}