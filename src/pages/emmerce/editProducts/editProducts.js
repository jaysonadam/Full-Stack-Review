import React, { useEffect, useState } from 'react';
import axios from "../../config/axios";

import EditCard from './editCard';

function EditProducts() {
    const [ products, setProducts ] = useState([]);
    
    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products/all");
            const { data } = res
    
            setProducts(data.products);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <h1>Edit Products</h1>
            </div>
            <div>
                {products.map((product) => {
                    return (
                        <EditCard 
                            key={product.product_id}
                            details={product}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default EditProducts;