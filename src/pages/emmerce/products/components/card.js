import React from "react";

import './card.css';
import Card from 'react-bootstrap/Card';

function ProductCard(props) {
    const { category_name, product_name, product_id, price, description, stock } = props.details;

    return (
        <>
            <Card id="kartu">
                <Card.Body>
                    <h5>{product_name}</h5>
                    <h5>Price: Rp. {price}</h5>
                    <h5>{description}</h5>
                    <h6>Product ID: {product_id}</h6>
                    <h6>Category: {category_name}</h6>
                    <h6>Stock: {stock}</h6>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard;