import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./FakeStoreData.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const FakeStoreData = () => {
  const [apidata, setapidata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [message, setmessage] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        setapidata(res);
        setfilterdata(res);
      });
  }, []);

  const getsearch = () => {
    const searchFilteredData = apidata.filter((p) =>
      p.title.toLowerCase().includes(searchvalue.toLowerCase()) ||
      p.description.toLowerCase().includes(searchvalue.toLowerCase())
    );

    if (searchFilteredData.length === 0) {
      setmessage("No Search Results Found");
    } else {
      setmessage("");
    }

    setfilterdata(searchFilteredData);
    setsearchvalue("");
  };

  const updateCategory = (selectcat) => {
    let categoryFiltered;

    if (selectcat !== "All") {
      categoryFiltered = apidata.filter((p) => p.category === selectcat);
    } else {
      categoryFiltered = apidata;
    }

    if (categoryFiltered.length === 0) {
      setmessage("No Search Results Found");
    } else {
      setmessage("");
    }

    setfilterdata(categoryFiltered);
  };

  return (
    <div>
      <div className="InputDiv">
        <select onChange={(e) => updateCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
        </select>
        <input
          type="text"
          placeholder="Search here ..."
          onChange={(e) => setsearchvalue(e.target.value)}
          value={searchvalue}
        />
        <button onClick={getsearch}>Search</button>
      </div>

      {message && <h2 style={{ textAlign: "center", color: "red" }}>{message}</h2>}

      <div className="card-container">
        {filterdata.map((p) => (
          <Card key={p.id} style={{ width: "100%", position:"relative"}}>
            <p style={{position:"absolute",top:"4px",right:"5px"}}>⭐{p.rating.rate}({p.rating.count})</p>
            <Card.Img variant="top" src={p.image} />
            <Card.Body>
              <Card.Title>{p.title}</Card.Title>
              <Card.Title>${p.price}</Card.Title>
              <Card.Text>{p.description}</Card.Text>
              <Button variant="warning">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FakeStoreData;
