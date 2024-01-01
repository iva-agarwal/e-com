import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-400 text-white p-4 text-center">
      {message}
    </div>
  );
};

export default Notification;
