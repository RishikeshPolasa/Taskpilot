import React from "react";
import InfoIcon from "../Icons/InfoIcon";
import SuccessIcon from "../Icons/SuccessIcon";
import WarningIcon from "../Icons/WarningIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import CloseIcon from "../Icons/CloseIcon";
import "./Notification.css";

function Notification(props) {
  const { type = "info", message, onClose } = props;

  const renderIcon = () => {
    switch (type) {
      case "Error":
        return <ErrorIcon />;
      case "Success":
        return <SuccessIcon />;
      case "Warning":
        return <WarningIcon />;
      default:
        return <InfoIcon />;
    }
  };
  return (
    <div className="notification">
      <div className="iconWrapper">{renderIcon()}</div>
      <div className="message">{message}</div>
      <div className="iconWrapper closeIcon" onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default Notification;
