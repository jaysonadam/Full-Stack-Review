import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import './editCard.css'
import { Card } from 'react-bootstrap';
import { Button } from "react-bootstrap";

function EditCard(props) {
    const { category_name, category_id, product_id, product_name, description, price, stock } = props.details;
    const [ categories, setCategories ] = useState([]);
    const [ formState, setFormState ] = useState({
        edit_category_id: category_id,
        edit_product_name: product_name,
        edit_description: description,
        edit_price: price,
        edit_stock: stock
    });

    console.log(formState.edit_category_id)

    const { edit_category_id, edit_product_name, edit_description, edit_price, edit_stock } = formState;

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/category/get");
            const { data } = res
    
            setCategories(data.categories);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    const updateProducts = async () => {
        try {
                const res = await axios.put(`/products/edit/${product_id}`, {
                    category_id: edit_category_id,
                    product_name: edit_product_name,
                    description: edit_description,
                    price: edit_price,
                    stock: edit_stock
                })

                alert("Update was successful");
        } catch (error) {
            console.log({ error })
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    return (
        <>
            <Card className="mt-4" id="c4rd">
                <Card.Body className="d-flex justify-content-around">
                    <h5 style={{ paddingTop: '8px' }}>ID: {product_id}</h5>
                    <input value={edit_product_name} onChange={handleChange} name="edit_product_name"></input>
                    <input value={edit_price} onChange={handleChange} name="edit_price" type="number"></input>
                    <input value={edit_description} onChange={handleChange} name="edit_description"></input>
                    <input value={edit_stock} onChange={handleChange} name="edit_stock" type="number"></input>
                    <h6 style={{ paddingTop: '8px' }}>Category: {category_name}</h6>
                    <select onChange={handleChange} name="edit_category_id">
                        {categories.map((category) => {
                            return (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            )
                        })}
                    </select>
                    <Button onClick={updateProducts}>Save Changes</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditCard;