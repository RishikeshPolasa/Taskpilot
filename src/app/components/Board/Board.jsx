import React, { useState } from "react";
import "./style.css";
import Card from "./Card/Card";
import PlusIcon from "../Icons/PlusIcon";
import CloseIcon from "../Icons/CloseIcon";
import NameIcon from "../Icons/NameIcon";
import AddNewCard from "./AddNewCard/AddNewCard";
function Board() {
  const [columns, setColumns] = useState({
    ToDo: [
      {
        id: "ToDo-1",
        cardName: "Product not found",
      },
      {
        id: "ToDo-2",
        cardName: "Order return implement",
      },
    ],
    "In Progress": [
      {
        id: "InProgress-1",
        cardName: "product name undefined",
      },
    ],
  });
  const [popup, setPopup] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [addnewCardPopup, setAddNewCardPopup] = useState("");

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
    const item = JSON.parse(e.dataTransfer.getData("item"));
    const fromColumn = e.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;
    const fromData = columns[fromColumn].filter((col) => col?.id !== item?.id);

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
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("fromColumn", column);
  };

  const handleAddnewCardPopup = (fromColumn) => {
    setAddNewCardPopup(fromColumn);
  };

  const handleColumnsChange = (fromColumn, val) => {
    const newVal = {
      ...val,
      id: `${fromColumn}-${columns[fromColumn].length + 1}`,
    };

    setColumns((prevCol) => ({
      ...prevCol,
      [fromColumn]: [...prevCol[fromColumn], newVal],
    }));
    closeAddNewCardPopup();
  };

  const closeAddNewCardPopup = () => {
    setAddNewCardPopup("");
  };

  return (
    <div>
      <ol className="ol">
        {Object.entries(columns).map(([key, value]) => {
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
                <div
                  onClick={() => handleAddnewCardPopup(key)}
                  className="addCard"
                >
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
      {addnewCardPopup && (
        <div className="popup">
          <div className="center">
            <AddNewCard
              fromColumn={addnewCardPopup}
              handleColumnsChange={handleColumnsChange}
              closeAddNewCardPopup={closeAddNewCardPopup}
            />
          </div>
        </div>
      )}
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
