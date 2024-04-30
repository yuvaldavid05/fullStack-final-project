import "./AdminUsers.css";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";


// לסדר שירנדר בכל שינוי 

function AdminProducts() {
    const [clients, setClients] = useState([]);

    const s = [
        { name: 'productName', type: 'text', label: 'product Name', required: true, sm: '6' },
        { name: 'description', type: 'text', label: 'description', required: true, sm: '6' },
        { name: 'price', type: 'email', label: 'price', required: true, sm: '12' },
        { name: 'sizes', type: 'tel', label: 'sizes', required: true, sm: '12' },
        { name: 'color', type: 'text', label: 'color', required: true, sm: '4' },
        { name: 'img', type: 'text', label: 'img', required: true, sm: '4' },
        { name: 'category', type: 'text', label: 'category', required: true, sm: '4' },
    ]

    useEffect(() => {
        fetch("http://localhost:2222/admin/users", {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setClients(data);
                console.log(data)
            });
    }, []);

    const removeClient = (clientdId) => {
        if (!window.confirm("Delete This User?")) {
            return;
        }

        fetch(`http://localhost:2222/admin/users/delete/${clientdId}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setClients(clients.filter(c => c.id !== clientdId));
            });
    }

    const changePermission = (clientdId) => {
        if (!window.confirm("Change Permission?")) {
            return;
        }


        fetch(`http://localhost:2222/admin/users/update-admin/${clientdId}`, {
            credentials: 'include',
            method: 'PUT',
        })
            .then(() => {
                // setClients();
            });
    }



    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {s.map((str, i) => (

                            <th>{str.label}</th>
                        ))}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, i) => (

                        <tr key={i}>
                            <th>{i + 1}</th>
                            {s.map((str2, index) => (

                                str2.type === 'boolean' ?
                                    <td key={index}>
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

export default AdminProducts;