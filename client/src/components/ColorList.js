import React, { useState, useEffect } from "react";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth.js";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  useEffect(() => {
    axios()
      .get("/colors")
      .then(res => updateColors(res.data));
  }, [editing]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const colorChangeHandler = e => {
    setColorToEdit({ ...colorToEdit, color: e.target.value });
  };
  const hexChangeHandler = e => {
    setColorToEdit({
      ...colorToEdit,
      code: { hex: e.target.value }
    });
  };

  const saveEdit = e => {
    e.preventDefault();
    const body = { ...colorToEdit };
    const { id } = colorToEdit;
    axios()
      .put(`/colors/${id}`, body)
      .catch(err => console.log(err));
    setEditing(false);
    colorUpdate();
  };

  const deleteColor = (e, color) => {
    e.stopPropagation();
    const { id } = color;
    axios()
      .delete(`/colors/${id}`)
      .catch(err => console.log(err));
    setEditing(false);
    colorUpdate();
  };

  function colorUpdate() {
    setTimeout(() => {
      axios()
        .get("/colors")
        .then(res => updateColors(res.data))
        .catch(err => console.log(err));
    }, 100);
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  deleteColor(e, color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input onChange={colorChangeHandler} value={colorToEdit.color} />
          </label>
          <label>
            hex code:
            <input onChange={hexChangeHandler} value={colorToEdit.code.hex} />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
