import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodlist, setFoodlist] = useState([]);
  const [newfoodName, setNewfoodName] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/read").then((response) => {
      console.log(response);
      setFoodlist(response.data);
    });
  }, []);

  const addToList = () => {
    console.log(foodName + " " + days);
    Axios.post("http://localhost:5000/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updatefood = (id) => {
    Axios.put("http://localhost:5000/update", {
      id: id,
      newfoodName: newfoodName,
    });
  };
  const deletefood = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label htmlFor="">
        <h3>Employee Name:</h3>
      </label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
        id="ename"
      />
      <label htmlFor="">
        <h3>Salary:</h3>
      </label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
        id="ename"
      />
      <br />
      <button onClick={addToList} className="custom-btn btn-5">
        Add to list
      </button>
      <h1>Employee Data</h1>
      {foodlist.map((val, key) => {
        return (
          <div key={key} className="food">
            <h1> E. Name:{val.foodName}</h1>
            <h1>Salary:{val.daySinceIAte}</h1>
            <input
              type="text"
              placeholder="New Employee name..."
              onChange={(event) => {
                setNewfoodName(event.target.value);
              }}
              id="upd"
            />
            <button
              onClick={() => updatefood(val._id)}
              className="custom-btn btn-9"
            >
              Update
            </button>
            <button
              onClick={() => deletefood(val._id)}
              className="custom-btn btn-10"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
