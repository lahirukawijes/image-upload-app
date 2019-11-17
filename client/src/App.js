import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import DefaultImg from './assets/default-img.jpg';

// base api url being used
const API_URL = "http://localhost:9890";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multerImage: DefaultImg
      
    }
  }

  setDefaultImage(uploadType) {
   if (uploadType === "multer")
      this.setState({
        multerImage: DefaultImg
      });
     
  }

  // function to upload image once it has been captured
  // includes multer methods
  uploadImage(e, method) {
    let imageObj = {};

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully Uploaded.");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading Image");
          this.setDefaultImage("multer");
        });
    } 
  }

  // function to capture base64 format of an image
  getBaseFile(files) {
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: files.base64
    });

    let imageObj = {
      imageName: "base-image-" + Date.now(),
      imageData: files.base64.toString()
    };

    axios.post(`${API_URL}/image/uploadbase`, imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          this.setDefaultImage("base");
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format")
        this.setDefaultImage("base");
      });
  }

  render() {
    return (
      <div className="main-container">
        <h3 className="main-heading">Image Upload App</h3>

        <div className="image-container">
          <div className="process">
            <h4 className="process__heading">Image Uploading...</h4>
            <p className="process__details">Upload image to a node server, connected to a MongoDB database, with the help of multer</p>

            <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
            <img src={this.state.multerImage} alt="upload-image" className="process__image" />
          </div>

          

          
        </div>

        <p className="main-credit">Created by <a href="#">Tarique Ejaz</a></p>
      </div>
    );
  }
}

export default App;