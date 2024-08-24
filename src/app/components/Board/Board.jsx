import React, { useState } from "react";
import "./style.css";
import Card from "./Card/Card";
import PlusIcon from "../Icons/PlusIcon";
import CloseIcon from "../Icons/CloseIcon";
function Board() {
  const [columns, setColumns] = useState({
    ToDo: ["pagination", "item2"],
    "In Progress": ["product name undefined"],
  });
  const [popup, setPopup] = useState(false);
  const [columnName, setColumnName] = useState("");
  const handleChangeColumnName = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setColumnName(e.target.value);
  };

  const handleClickColumn = (e) => {
    setColumns((prevCol) => ({
      ...prevCol,
      [columnName]: [],
    }));
    handlePopup();
    setColumnName("");
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  const onDrop = (e, toColumn) => {
    const item = e.dataTransfer.getData("item");
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;
    const fromData = columns[fromColumn].filter((col) => col !== item);
    const toData = [...columns[toColumn], item];
    setColumns((prevCol) => ({
      ...prevCol,
      [fromColumn]: fromData,
      [toColumn]: toData,
    }));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e, item, column) => {
    e.dataTransfer.setData("item", item);
    e.dataTransfer.setData("fromColumn", column);
  };

  return (
    <div>
      <ol className="ol">
        {Object.entries(columns).map(([key, value]) => {
          console.log("keyee", key, value);
          return (
            <li
              key={key}
              className="list"
              onDrop={(e) => onDrop(e, key)}
              onDragOver={onDragOver}
            >
              <div className="columnWrapper">
                <div className="listName">{key}</div>
                <div>
                  <Card curKey={key} value={value} onDragStart={onDragStart} />
                </div>
                <div className="addCard">
                  <PlusIcon /> Add a card
                </div>
              </div>
            </li>
          );
        })}
        <div className="addOneLIst" onClick={() => handlePopup()}>
          <PlusIcon /> Add another list
        </div>
      </ol>
      {popup && (
        <div className="popup">
          <div className="center">
            <div className="addNewColumnWrapper">
              <CloseIcon onClick={() => handlePopup()} />
              <div className="addNewColumn">
                <label>List Name</label>
                <input
                  value={columnName}
                  onChange={(e) => handleChangeColumnName(e)}
                  required
                />
              </div>
              <div className="addNew" onClick={(e) => handleClickColumn(e)}>
                Add New
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
