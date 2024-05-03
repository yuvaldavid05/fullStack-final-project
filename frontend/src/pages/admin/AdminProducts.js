import "./AdminProducts.css";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import Button from "react-bootstrap/esm/Button";
import { CiEdit } from "react-icons/ci";

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
        <section id="admin-user-page" className='admin-user-page-body'>
            <div className="add-pro">
                <Button >+ add product</Button>
            </div>
            <Table responsive="md" striped bordered hover className="align-middle">
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        {s.map((str, i) => (

                            <th key={i} className="align-middle">{str.label}</th>
                        ))}
                        <th className="align-middle">Delete</th>
                        <th className="align-middle">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((items, i) => (

                        <tr key={i}>
                            <th>{i + 1}</th>
                            {s.map((str2, index) => (

                                str2.type === 'array' ?
                                    <td key={index} >
                                        {items[str2.name].join(", ")}
                                    </td>
                                    :
                                    str2.name === "stock" ?
                                        <td key={index} > {items[str2.name] || 'out of stock'}</td>
                                        : <td td key={index}  > {items[str2.name] || '-'}</td>
                            ))}
                            <>
                                <td className="delete-icon" onClick={() => removeItem(items._id)}>
                                    <AiFillDelete />
                                </td>
                                <td className="edit-icon">
                                    <CiEdit />
                                </td>

                            </>
                        </tr>

                    ))}
                </tbody>
            </Table >
        </section>
    );
}

export default AdminProducts;