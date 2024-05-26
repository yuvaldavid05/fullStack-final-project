import "./AdminUsers.css";
import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { GeneralContext } from '../../App';


function AdminUsers() {
    const [clients, setClients] = useState([]);
    const { loader, setLoader, snackbarOn } = useContext(GeneralContext);

    const s = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, sm: '6' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, sm: '6' },
        { name: 'email', type: 'email', label: 'Email', required: true, sm: '12' },
        { name: 'phone', type: 'tel', label: 'Phone', required: true, sm: '12' },
        { name: 'country', type: 'text', label: 'Country', required: true, sm: '4' },
        { name: 'city', type: 'text', label: 'City', required: true, sm: '4' },
        { name: 'street', type: 'text', label: 'Street', required: true, sm: '4' },
        { name: 'houseNumber', type: 'number', label: 'House Number', required: true, sm: '6' },
        { name: 'zip', type: 'number', label: 'Zip', required: false, sm: '6' },
        { name: 'admin', type: 'boolean', label: 'Admin', sm: '6' }
    ]

    useEffect(() => {
        setLoader(true);
        fetch("http://localhost:2222/admin/users", {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(res => res.json())
            .then(data => {
                setClients(data);
            })
            .finally(() => setLoader(false));
    }, [setClients]);

    const removeClient = (clientdId) => {
        if (!window.confirm("Delete This User?")) {
            return;
        }

        setLoader(true);
        fetch(`http://localhost:2222/admin/users/delete/${clientdId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(() => {
                setClients(clients.filter(c => c._id !== clientdId));
            })
            .finally(() => {
                setLoader(false)
                snackbarOn("User deleted successfully");
            });
    }

    const changePermission = (clientdId) => {
        if (!window.confirm("Change Permission?")) {
            return;
        }

        setLoader(true);
        fetch(`http://localhost:2222/admin/users/update-admin/${clientdId}`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Authorization': localStorage.token
            },
        })
            .then(() => {
                // setClients(clients.filter(c => c._id !== ""));
            })
            .finally(() => {
                setLoader(false)
                snackbarOn("Permissions changed successfully");
            });
    }



    return (
        <>
            <Table responsive="md" striped bordered hover className="align-middle">
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        {s.map((str, i) => (

                            <th key={i} className="align-middle">{str.label}</th>
                        ))}
                        <th className="align-middle">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, i) => (

                        <tr key={i}>
                            <th>{i + 1}</th>
                            {s.map((str2, index) => (

                                str2.type === 'boolean' ?
                                    <td key={index} >
                                        {client[str2.name] === true ? 'Yes' : 'No'}
                                        <br></br>
                                        <button className='admin-change' onClick={() => changePermission(client._id)}>click to change</button>
                                    </td>
                                    :
                                    <td key={index}>{client[str2.name] || '-'}</td>


                            ))}
                            <>
                                <td onClick={() => removeClient(client._id)}>
                                    <AiFillDelete />
                                </td>

                            </>
                        </tr>

                    ))}
                </tbody>
            </Table >
        </>
    );
}

export default AdminUsers;