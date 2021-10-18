import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';


const app = new Clarifai.App({
  apiKey: "3a162abdedda4d23b96087763a80ff38",
});


class App extends Component {

  constructor(){
    super()
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSigedIn: false
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };

  /* this function display the face-detect box base on the state values */
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({ box: box });
  };
  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true })
    }
    this.setState({route: route})
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))    
    .catch(err => console.log(err.response.data.status.description));
  };
  render() {
    const {isSignedIn, imageUrl, box, route} = this.state
      return (
       <div className="App">
        <Navigation isSignedIn={isSignedIn}onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin' ?
           <SignIn onRouteChange={this.onRouteChange}/>
           :  <Register onRouteChange={this.onRouteChange}/>
        )
       
      }
      </div>
    );
  }
}


export default App;
