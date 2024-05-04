import "./AdminProducts.css";
import Table from 'react-bootstrap/Table';
import { useEffect, useRef, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import Button from "react-bootstrap/esm/Button";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

// לסדר שירנדר בכל שינוי 

function AdminProducts() {
    const [items, setItems] = useState([]);

    const myRef = useRef(null);

    const s = [
        { name: 'productName', type: 'text', label: 'product Name', required: true, sm: '6' },
        { name: 'description', type: 'text', label: 'Description', required: true, sm: '6' },
        { name: 'price', type: 'number', label: 'Price', required: true, sm: '12' },
        { name: 'sizes', type: 'array', label: 'Sizes', required: true, sm: '12' },
        { name: 'color', type: 'array', label: 'Color', required: true, sm: '4' },
        { name: 'img', type: 'text', label: 'Img URL', required: true, sm: '4' },
        { name: 'category', type: 'text', label: 'Category', required: true, sm: '4' },
        { name: 'stock', type: 'number', label: 'Stock', required: true, sm: '4' },
    ]

    useEffect(() => {
        fetch("http://localhost:2222/products", {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                myRef.current = data;
                setItems(data);
                console.log(data);
                console.log(myRef);
            });
    }, [myRef]);



    const removeItem = (itemId) => {
        if (!window.confirm("Delete This Product?")) {
            return;
        }

        fetch(`http://localhost:2222/admin/products/${itemId}`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setItems(items.filter(c => c.id !== itemId));
            });
    }




    return (
        <section id="admin-user-page" className='admin-user-page-body'>

            <Button className="new-pro">
                <Link to="/admin/products/new-product">+ add product</Link>
            </Button>

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
                                        : <td key={index}  > {items[str2.name] || '-'}</td>
                            ))}
                            <>
                                <td className="delete-icon" onClick={() => removeItem(items._id)}>
                                    <AiFillDelete />
                                </td>
                                <td className="edit-icon">
                                    <Button>
                                        <Link to={`/admin/products/${items._id}`}><CiEdit /></Link>

                                    </Button>
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