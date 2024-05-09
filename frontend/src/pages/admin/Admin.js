import "./Admin.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";

// דף של התגים שמושכים לתוכם את הפרוייקטים ואת היוזרים
export default function Admin() {
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

                </Tabs>
            </section>
        </>
    )
}