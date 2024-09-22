import React, { useEffect, useState } from "react";
import "./style.css";
import Card from "./Card/Card";
import PlusIcon from "../Icons/PlusIcon";
import CloseIcon from "../Icons/CloseIcon";
import NameIcon from "../Icons/NameIcon";
import AddNewCard from "./AddNewCard/AddNewCard";
import Notification from "../Notification/Notification";
import useNotification from "@/hooks/useNotification";
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
  const [editCard, setEditCard] = useState(null);
  const { NotificationComponent, triggerNotification } =
    useNotification("bottom-right");
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
    triggerNotification({
      type: "Success",
      message: "Successfully added new column",
    });
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

  const handleColumnsChange = (fromColumn, val, isEdit) => {
    setColumns((prevCol) => {
      const updatedColumns = { ...prevCol };

      if (isEdit) {
        // Remove the existing card by filtering out the card with the matching ID
        updatedColumns[fromColumn] = updatedColumns[fromColumn].filter(
          (card) => card.id !== val.id
        );
        // Add the updated card back into the column
        updatedColumns[fromColumn] = [...updatedColumns[fromColumn], val];
      } else {
        // Create a new card with a unique ID based on the column length
        const newVal = {
          ...val,
          id: `${fromColumn}-${updatedColumns[fromColumn].length + 1}`,
        };
        // Add the new card to the column
        updatedColumns[fromColumn] = [...updatedColumns[fromColumn], newVal];
      }

      return updatedColumns;
    });

    // Close the popup after changes are made
    closeAddNewCardPopup();
    triggerNotification({
      type: isEdit ? "Info" : "Success",
      message: isEdit ? "Edited the card" : "Added New Card",
    });
    setEditCard(null);
  };

  const closeAddNewCardPopup = () => {
    setAddNewCardPopup("");
    setEditCard(null);
  };

  const handleEditCard = (val) => {
    setEditCard(val);
  };
  useEffect(() => {
    if (addnewCardPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [addnewCardPopup]);

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
              <div
                className="columnWrapper"
                onClick={() => handleAddnewCardPopup(key)}
              >
                <div className="listName">{key}</div>
                <div>
                  <Card
                    curKey={key}
                    value={value}
                    onDragStart={onDragStart}
                    handleEditCard={handleEditCard}
                  />
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
              editCard={editCard}
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
      {NotificationComponent}
    </div>
  );
}

export default Board;
