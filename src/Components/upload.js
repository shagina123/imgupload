import React, { Component } from "react";
 import UploadService from "../Services/api";
import './upload.css'
export default class UploadImages extends Component {
  
    state = {
        currentFile: undefined,
        previewImage: undefined,
        progress: 0,
        message: "",
  
        imageInfos: [],
      };
      selectFile=(event)=>{

        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            progress: 0,
            message: ""
          });
      }

      upload=()=>{
        this.setState({
            progress: 0,
          });
      
          UploadService.upload(this.state.currentFile, (event) => {
            this.setState({
              progress: Math.round((100 * event.loaded) / event.total),
            });
          })
            .then((response) => {
              this.setState({
                message: response.data.message,
              });
              return UploadService.getFiles();
            })
            .then((files) => {
              this.setState({
                imageInfos: files.data,
              });
            })
            .catch((err) => {
              this.setState({
                progress: 0,
                message: "Could not upload the image!",
                currentFile: undefined,
              });
            });
      }
  render() {

    const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
      } = this.state;
  return(
      <div className='uploadDiv'>
<div className="row">
          <div className="col-8 col1">
            <label className="btn  p-0 selectbtn">
              <input type="file" accept="image/*" className="selectin" onChange={this.selectFile} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success uploadbtn btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>
          </div>
        </div>
        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div> 
        )}

        <div className="card mt-3">
          <div className="card-header"> File uploaded</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <a href={img.url}>{img.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
  )
  }
}