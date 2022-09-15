import React from "react";

import './home.css';
import Cards from "../../components/cards/cards";

const number = [
    { no: 1 },
    { no: 2 },
    { no: 3 },
    { no: 4 }
]

function Home() {
    return (
        <>
            <div className="box-image">
                    <img src='https://www.webbikeworld.com/wp-content/uploads/2022/06/2022-Yamaha-R1-3-1024x588.jpg'>
                    </img>
                    <img src='https://www.webbikeworld.com/wp-content/uploads/2022/06/2022-Yamaha-R1-3-1024x588.jpg'></img>
            </div>
            <div className="image">
                    <img src='https://www.webbikeworld.com/wp-content/uploads/2022/06/2022-Yamaha-R1-3-1024x588.jpg'>
                    </img>
            </div>
            <div className="box">
                <div className="row gx-0">
                    <div className="card-1">1</div>
                    <div className="card-1">2</div>
                    <div className="card-1">3</div>
                </div>
                <div className="row gx-0">
                    <div className="card-2">4</div>
                    <div className="card-2">5</div>
                    <div className="card-2">6</div>
                    <div className="card-2">7</div>
                </div>
                <div className="row gx-0">
                    <div className="card-3">8</div>
                </div>
            </div>
            <div className="option">
                {number.map((item) => (
                    <Cards
                        key={item.no}
                        items={item}
                    />
                ))}
            </div>
            <div className="footer">
                <h2>Footer</h2>   
            </div>
        </>
    )
}

export default Home;