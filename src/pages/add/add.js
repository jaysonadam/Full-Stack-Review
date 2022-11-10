import React, { useState } from "react";

import './add.css';
import { Button } from "react-bootstrap";

function AddProducts() {
    const [ formState, setFormState ] = useState({
        name: '',
        description: '',
        price: 1000,
        stock: 1
    });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div>
                <h1>Add Products</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column mt-5 w-50">
                    <input id="ipt" name="name" placeholder="Product Name" type="text" onChange={handleChange}/>
                    <input id="ipt" name="price" placeholder="Product Price (Rp.)" type="number" min="0" value={ formState.price } onChange={handleChange}/>
                    <input id="ipt" name="description" placeholder="Product Description" type="text" onChange={handleChange}/>
                    <input id="ipt" name="stock" placeholder="Stock" type="number" min="0" value={ formState.stock } onChange={handleChange}/>
                    <Button id="ipt">Add Product</Button>
                </div>
            </div>
        </>
    )
}

export default AddProducts;