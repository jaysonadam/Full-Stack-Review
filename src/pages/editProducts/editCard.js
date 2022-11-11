import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import './editCard.css'
import Card from 'react-bootstrap/Card';

function EditCard(props) {
    const [ categories, setCategories ] = useState([]);
    
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

    const { category_name, product_id, product_name, description, price, stock } = props.details;

    return (
        <>
            <Card className="mt-4" id="c4rd">
                <Card.Body className="d-flex justify-content-around">
                    <h5>ID: {product_id}</h5>
                    <input value={product_name}></input>
                    <input value={price}></input>
                    <input value={description}></input>
                    <input value={stock}></input>
                    <h6>Category: {category_name}</h6>
                    <select>
                        {categories.map((category) => {
                            return (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            )
                        })}
                    </select>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditCard;