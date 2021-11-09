import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState<string>();

  const isclick = () => {
    axios
      .get(`http://localhost:3001/tt?name=${keyword}`)
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <input onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={isclick} />
    </>
  );
}

export default App;
