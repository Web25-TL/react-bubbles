import React, { useState, useEffect } from "react";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth.js";

import Bubbles from "./Bubbles";
import Ribbons from "./Ribbons.js";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axios()
      .get("/colors")
      .then(res => {
        setColorList(res.data);

        // colorList.map(i => setMyColors([...myColors, i]));
      })
      .catch(err => console.log(err));
  }, []);
  if (colorList.length === 0) {
    return null;
  }
  return (
    <>
      <ColorList {...props} colors={colorList} updateColors={setColorList} />
      <div className="display">
        <span className="bubbles">
          <Bubbles {...props} colors={colorList} />
        </span>
        <span className="ribbons">
          <Ribbons {...props} colors={colorList} />
        </span>
      </div>
    </>
  );
};

BubblePage.defaultProps = {
  colors: [{ color: "black", code: { hex: "#000000", id: null } }]
};

export default BubblePage;
