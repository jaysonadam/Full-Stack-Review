import React from "react";

import "./cards.css";
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Cards(props) {
    const {no} = props.items
    return (
        <>
            <Card className="kartu">
                <Card.Body>
                    <Button>{no}</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Cards;