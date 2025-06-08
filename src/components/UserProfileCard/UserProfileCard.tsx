import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./UserProfileCard.css";

interface UserProfileCardProps {
  onClose: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const handleOutsideClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      ref={cardRef}
      className={`user-profile-card ${isVisible ? "fade-in" : "fade-out"}`}
      tabIndex={0} // for focus style
    >
      <div className="user-profile-header">
        <h2 className="user-profile-heading">User Profile</h2>
        <CloseIcon className="close-icon" onClick={handleClose} />
      </div>
      <div className="user-profile-content">
        <div className="avatar">U</div>
        <div className="user-info">
          <div className="user-name">Usman Khan</div>
          <div className="user-email">usman@example.com</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
