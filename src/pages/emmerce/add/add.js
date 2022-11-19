import React, { useEffect, useState } from "react";
import axios from "../../../../config/axios";

import './add.css';
import { Button } from "react-bootstrap";

function AddProducts() {
    const [ formState, setFormState ] = useState({
        product_name: '',
        description: '',
        price: 1000,
        stock: 1,
        category_id: 1
    });

    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/category/get");
            const { data } = res
    
            setCategories(data.categories);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    const addProducts = async () => {
        try {
            const res = await axios.post("/products/new",
            {
                product_name: formState.product_name,
                price: formState.price,
                stock: formState.stock,
                category_id: formState.category_id,
                description: formState.description
            });

            alert("Product successfully added")
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    return (
        <>
            <div>
                <h1>Add Products</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column mt-5 w-50">
                    <input id="ipt" name="product_name" placeholder="Product Name" type="text" onChange={handleChange}/>
                    <input id="ipt" name="description" placeholder="Product Description" type="text" onChange={handleChange}/>

                    <h5 id="ipt">Price (Rp.)</h5>
                    <input name="price" type="number" min={1000} value={ formState.price } onChange={handleChange}/>

                    <h5 id="ipt">Stock</h5>
                    <input name="stock" type="number" min={1} max={100} value={ formState.stock } onChange={handleChange}/>

                    <h5 id="ipt">Select Product Category</h5>
                    <select name="category_id" onChange={handleChange}>
                        {categories.map((category) => 
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        )}
                    </select>

                    <Button id="ipt" onClick={addProducts}>Add Product</Button>
                </div>
            </div>
        </>
    )
}

export default AddProducts;