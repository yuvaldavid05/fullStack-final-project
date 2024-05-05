import "./AdminProducts.css";
import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useRef, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import Button from "react-bootstrap/esm/Button";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GeneralContext } from '../../App';

// לסדר שירנדר בכל שינוי

function AdminComments() {
    // const [items, setItems] = useState([]);
    const { user, roleType, setUser, setRoleType, admin, setAdmin, comment, setComment } = useContext(GeneralContext);
    const myRef = useRef(null);

    const structureFormC = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, sm: '6' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, sm: '6' },
        { name: 'email', type: 'email', label: 'Email', required: true, sm: '12' },
        { name: 'text', type: 'textarea', label: 'Comments', required: true, sm: '12' },

    ]

    useEffect(() => {
        console.log(comment);
    }, [])
    // useEffect(() => {
    //     fetch("http://localhost:2222/products", {
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             myRef.current = data;
    //             setItems(data);
    //             console.log(data);
    //             console.log(myRef);
    //         });
    // }, [myRef]);


    // onClick={() => removeItem(c._id)}
    // const removeItem = (itemId) => {
    //     if (!window.confirm("Delete This Product?")) {
    //         return;
    //     }

    //     fetch(`http://localhost:2222/admin/products/${itemId}`, {
    //         credentials: 'include',
    //         method: 'DELETE',
    //     })
    //         .then(() => {
    //             setItems(items.filter(c => c.id !== itemId));
    //         });
    // }




    return (
        <section id="admin-comments-page" className='admin-comments-page-body'>


            <Table responsive="md" striped bordered hover className="align-middle">
                <thead>
                    {comment.length &&
                        <tr>
                            <th className="align-middle">#</th>
                            {structureFormC.map((str, i) => (

                                <th key={i} className="align-middle">{str.label}</th>
                            ))}
                            <th className="align-middle">Delete</th>

                        </tr>
                    }
                </thead>
                <tbody>
                    {comment.length ?
                        comment.map((c, i) => (

                            <tr key={i}>
                                <th>{i + 1}</th>
                                {structureFormC.map((str2, index) => (

                                    <td key={index} > {c[str2.name] || '-'}</td>
                                ))}
                                <>
                                    <td className="delete-icon">
                                        <AiFillDelete />
                                    </td>


                                </>
                            </tr>

                        )) : <td>no comment</td>
                    }
                    {/* {comment.map((c, i) => (

                        <tr key={i}>
                            <th>{i + 1}</th>
                            {structureFormC.map((str2, index) => (

                                <td key={index} > {c[str2.name] || '-'}</td>
                            ))}
                            <>
                                <td className="delete-icon">
                                    <AiFillDelete />
                                </td>


                            </>
                        </tr>

                    ))} */}
                </tbody>
            </Table >
        </section>
    );
}

export default AdminComments;