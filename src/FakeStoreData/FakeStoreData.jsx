import React, { useEffect, useState } from "react";
import {Card,Button} from 'react-bootstrap'
import './FakeStoreData.css'
const FakeStoreData = () => {
  const [apidata, setapidata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  useEffect(() => {
    // console.log(selectedfiltercategory)
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setapidata(res);
        setfilterdata(res);
      });
  }, []);
  // const show = () => {
  //   console.log(selectedfiltercategory);
  // };
  const getsearch = () => {
    // console.log(searchvalue)
    let searchFilterdData = apidata.filter((p) =>
      p.title.toLowerCase().includes(searchvalue.toLowerCase()||p.description.toLowerCase().includes(searchvalue.toLowerCase()))
    );
    setfilterdata(searchFilterdData)
    setsearchvalue("")
  };
  const updateCategory = (selectcat) => {
    // console.log(selectcat)
    if (selectcat != "All") {
      const categoryFilterd = apidata.filter((p) => p.category === selectcat);
      setfilterdata(categoryFilterd);
    }
    else{
      setfilterdata(apidata)
    }
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
          onChange={(e) => {
            setsearchvalue(e.target.value);
          }}
          value={searchvalue}
        />
        <button onClick={getsearch}>search</button>
      </div>
      {/* <button onClick={show}>show seleted category</button> */}
      {filterdata.map((p) => {
        return (
          <>
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={p.image} style={{maxWidth:"200px"}} />
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Title>${p.price}</Card.Title>
        <Card.Text>
      {p.description}
        </Card.Text>
      </Card.Body>
    </Card>
          </>
        );
      })}
    </div>
  );
};

export default FakeStoreData;
