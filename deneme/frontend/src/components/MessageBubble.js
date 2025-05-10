import React from 'react';

export default function MessageBubble({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      {text}
    </div>
  );
}
