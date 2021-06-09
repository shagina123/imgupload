import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImages from './Components/upload'
import React from 'react'
function App() {
  return (
    <div className="App">
      <div className="titleDiv">Image Upload</div>
     <UploadImages/>
    </div>
  );
}

export default App;
