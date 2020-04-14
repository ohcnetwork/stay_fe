import React from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/icon.svg';
import './Loading.css';

function Loading() {

  const isLoading = useSelector(state => state.appState.isLoading);

  return (
    <div className={`main-loader ${isLoading? "": "disabled"}`}>
      <div className="container">
        <div className="progress-logo" style={{ backgroundImage: `url(${logo})` }}></div>
        <div style={{marginTop: "30px", height: "8px", borderRadius: "4px", backgroundColor: "#00000022", overflow: "hidden"}}>
          <div className="loader-custom"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;