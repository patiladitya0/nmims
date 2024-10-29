import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="card">
      <div className="loader">
        <p>Loading</p>
        <div className="words">
          <span className="word">buttons</span>
          <span className="word">forms</span>
          <span className="word">switches</span>
          <span className="word">cards</span>
          <span className="word">buttons</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
