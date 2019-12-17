import React, { useState, useEffect } from "react";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth.js";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState(props.colors);
  const [myColors, setMyColors] = useState([]);

  useEffect(() => {
    axios()
      .get("/colors")
      .then(res => {
        setColorList(res.data);

        // colorList.map(i => setMyColors([...myColors, i]));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ColorList {...props} colors={colorList} updateColors={setColorList} />
      <Bubbles {...props} colors={colorList} />
    </>
  );
};

BubblePage.defaultProps = {
  colors: [{ color: "black", code: { hex: "#000000", id: null } }]
};

export default BubblePage;
