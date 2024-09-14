import React from "react";
import "./style.css";
function Card(props) {
  const { curKey, value, onDragStart, handleEditCard } = props;
  return (
    <>
      {value?.map((val) => {
        return (
          <div
            draggable
            onDragStart={(e) => {
              onDragStart(e, val, curKey);
            }}
            className="cardWrapper"
            onClick={() => handleEditCard(val)}
          >
            <div className="labels">{curKey}</div>
            <div className="cardInfo">{val?.cardName || val}</div>
          </div>
        );
      })}
    </>
  );
}

export default Card;
