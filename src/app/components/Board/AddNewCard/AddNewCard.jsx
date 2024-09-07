import React, { useState } from "react";
import NameIcon from "../../Icons/NameIcon";
import CloseIcon from "../../Icons/CloseIcon";
import "./style.css";
import DescriptionIcon from "../../Icons/DescriptionIcon";

function AddNewCard(props) {
  const { fromColumn, handleColumnsChange, closeAddNewCardPopup } = props;
  const [card, setCard] = useState({});
  const handleCardChange = (e, name) => {
    const val = e.target.value;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: val,
    }));
  };

  return (
    <div className="addNewCardWrapper">
      <div className="cardNameAndCloseIcon">
        <div className="cardNameAndIcon">
          <NameIcon />
          <div className="cardName">
            <input
              onChange={(e) => handleCardChange(e, "cardName")}
              val={card?.name}
              placeholder="Enter the task name"
            />
            <p>
              in list <span>{fromColumn}</span>
            </p>
          </div>
        </div>
        <CloseIcon onClick={() => closeAddNewCardPopup()} />
      </div>
      <div className="info">
        <div className="leftContainer">
          <div className="lablesWrapper">
            <label>Labels</label>
            <div className="lableName">Website</div>
          </div>
          <div className="descriptionWrapper">
            <div className="cardLabelWrapper">
              <div>
                <DescriptionIcon />
                <div className="cardLabel">Description</div>
              </div>
              <div className="button">Edit</div>
            </div>
            <div className="textarea">
              <textarea
                value={card?.description}
                onChange={(e) => handleCardChange(e, "description")}
              />
            </div>
            <div className="buttons">
              <button
                className="save"
                onClick={() => handleColumnsChange(fromColumn, card)}
              >
                Save
              </button>
              <button className="cancel" onClick={() => closeAddNewCardPopup()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="rightContainer">rightcontainer</div>
      </div>
    </div>
  );
}

export default AddNewCard;
