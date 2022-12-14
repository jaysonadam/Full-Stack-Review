import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import './products.css';
import ProductCard from "./components/card";

function Products() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products/all");
            const { data } = res
    
            setProducts(data.products);
          } catch (error) {
            console.log(alert(error.message));
          }
    };

    return (
        <>
            <div>
                <h1>Products</h1>
            </div>
            <div id="pro">
                <div class="d-flex flex-wrap col-9 my-5 justify-content-center">
                {products.map((product) => {
                    return (
                        <ProductCard
                            key={product.product_id}
                            details={product}
                        />
                    )
                })}
                </div>
            </div>
        </>
    )
}

export default Products;