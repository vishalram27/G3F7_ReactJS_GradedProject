import React from 'react';
import '../Notification.css';

function Notification({ message, onClose }) {
    return (
        <div className="notification">
            <span className="notification-text">{message}</span>
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    );
}

export default Notification;