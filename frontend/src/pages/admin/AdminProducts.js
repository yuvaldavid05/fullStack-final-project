import "./AdminUsers.css";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";


// לסדר שירנדר בכל שינוי 

function AdminProducts() {
    const [items, setItems] = useState([]);

    const s = [
        { name: 'productName', type: 'text', label: 'product Name', required: true, sm: '6' },
        { name: 'description', type: 'text', label: 'description', required: true, sm: '6' },
        { name: 'price', type: 'number', label: 'price', required: true, sm: '12' },
        { name: 'sizes', type: 'array', label: 'sizes', required: true, sm: '12' },
        { name: 'color', type: 'array', label: 'color', required: true, sm: '4' },
        { name: 'img', type: 'text', label: 'img', required: true, sm: '4' },
        { name: 'category', type: 'text', label: 'category', required: true, sm: '4' },
        { name: 'stock', type: 'number', label: 'stock', required: true, sm: '4' },
    ]

    useEffect(() => {
        fetch("http://localhost:2222/products", {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setItems(data);
                console.log(data);
            });
    }, []);


    // לבדוק
    const removeItem = (itemId) => {
        if (!window.confirm("Delete This User?")) {
            return;
        }

        fetch(`http://localhost:2222/admin/users/delete/${itemId}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setItems(items.filter(c => c.id !== itemId));
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
                    {items.map((items, i) => (

                        <tr key={i}>
                            <th>{i + 1}</th>
                            {s.map((str2, index) => (

                                str2.type === 'array' ?
                                    <td key={index}>
                                        {items[str2.name].join(", ")}
                                    </td>
                                    :
                                    <td key={index}>{items[str2.name] || '-'}</td>


                            ))}
                            <>
                                <td onClick={() => removeItem(items._id)}>
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