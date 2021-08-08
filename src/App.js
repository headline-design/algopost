import logo from './logo.svg';
import './App.css';
import cat from './cat.jpg'
import pipe from './pipeline-express.jpg';
import React, { Component } from 'react';
import { Pipeline, AlgoButton, AlgoSendButton } from 'pipeline-express-react';

const myAlgoWallet = Pipeline.init();

//const catdata = "AAAAACAgICAAAAAAAAAAAAAAACCIzMyt0YyIsdHRAAAAICAgICAgAAAAICQAAAAAACCIzMzR0dHR+fr6AAAgICQkREREIAAgRIhoAAAAACCIzMzR1Yj1+v76AAAgJEREaIiIRABErK2sIAAAAABozND1iK35+v7+AAAgJERojK2saCBoiM2s9QAAAABkzPCsrM35+v7+AAAgJGisrdHRiCRoiKysiCAAAABkzKyI0c35+fr+AABEaIzQ0dXRjCAAqPHRiIgAAABkRESs9cj++vr+AABEaKzR9fWtRAAA0fH1rGggAAAgaGTx9ez++vn6AABEjKysaEQgAAAAiMzMzIggAABkRGTNzfH++vX1ACSIrIwgIAAAACAA0YTRzayIACAAiKzNzfb5+fXwAESMrCQAACAgICQgiKj1QIhEAGQAiETRqNH19fXxJGisrAAgICBERGgkZKyMzWQgiCAAIGiI0YjR+fn1JIitaAAAACBEaGhEaIiIREQAZGgAACBorKzR+vr6RIytJAAAAEREZGgkrESIRCBoREQgAACIIM3R+fr6JIisIAAAIERoRGhEjGisrACsiGhERCCsZKzR+fn6JGiMAAAgRERoRGhEZABEIADwrERoAGiIAKzR9fn5JGiMICAgREREaEREiGhERADM9YgArCCsRIjR9fn1AERoJCAgaEREiCSIiM1ErEQgzKwAACAgrGjM9fXRACRoJCBEREREjACssdHNICDRaET2rCAgjGSs0dHQACRERCBEREREjACIjIgARGhoZCDRIABEiESIrKysAAAkJCAgRABkiACIiGis0YxEAESsZIhoZERoiIhoAAAAAAAgREQgaCSIiK2I0UQgICAgqK1oRERkZEQgBAAAACAAAEQgZGgkiK2srKxoqCCIRIhERERERAAABAAAAABERABEZIhEaKys8axErGSIiGRERGggIAAAAAAAAAAgJCAgRGiIIERoRIzRiGT6iGRERCAAAAAAAAAAAAAAACAARGSIiEREZK3R0frRrWREICBkAAAAACBEaIisRCAgRERERERkiGRAQEQgICAgICAgIEAgQCAgRERERCBEQEBAQCAgICAgICAgICAgICAAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAAICAgICAgICAgICAgICAgICAgICAgICAAAAAAAAAA"

const imgSrc = cat;

function base64ToArrayBuffer(data){
   let newData = Buffer.from(data, 'base64');
   console.log(newData);
   return newData;
}

function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}

var imgdata = [];

function eightbit(data){
let newData = [];
let counter = 0;
for (var i = 0; i < data.length; i += 3){
  let r = data[i];
  let g = data[i + 1];
  let b = data[i + 2];
  let newColor = (Math.floor((r / 32)) << 5) + (Math.floor((g / 32)) << 2) + Math.floor((b / 64));
  newData.push(newColor);
}
return newData;
}

function rgbFrom8(data) {
  let newData = [];
  for (var i = 0; i < data.length; i++) {
    let pixel = data[i];
    let r = (pixel >> 5) * 32;
    let g = ((pixel & 28) >> 2) * 32;
    let b = (pixel & 3) * 64;
    newData.push(r);
    newData.push(g);
    newData.push(b);
  }
  return newData;
  }



function removeAlpha(data){
  let newData = [];
  let counter = 0
  for (var i = 0; i < data.length; i ++){
    if (counter < 3) {newData.push(data[i]); counter ++;}
    else {counter = 0 }
  }
  return newData;
}

function addAlpha(data){
  let newData = [];
  let counter = -1
  for (var i = 0; i < data.length ; i ++){
    if (counter < 2) {newData.push(data[i]); counter ++;}
    else {newData.push(255); newData.push(data[i]); counter = 0;}
  }
  newData.push(255);
  return newData;
  
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      myAddress: "",
      URL: ""
    }
  }

  updateCanvas(newsrc){
    var img = new Image();
    img.crossOrigin = 'Aanonymous';
    img.src = newsrc;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    img.onload = () => {
      canvas.width=30
      canvas.height=30
      ctx.drawImage(img, 0, 0, 30, 30)
      img.style.display = 'none';
      imgdata = ctx.getImageData(0, 0, 30, 30).data;
      
      this.setState({ data: eightbit(removeAlpha(imgdata)) }, 
      () => this.setState({ note: bin2String(this.state.data) }, 
      () => this.drawData()))

    }
  }

  drawData(){
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const newData = addAlpha(rgbFrom8(this.state.data));
    var pic = new Uint8ClampedArray(newData);
    var imgData = new ImageData(pic,30,30);
    var renderer = document.createElement('canvas');
    renderer.getContext('2d').putImageData(imgData, 0, 0);
    ctx.drawImage(renderer, 0,0, 1200, 600);
  }

  componentDidMount(){
    this.updateCanvas(cat);
}

click = () => {
  this.updateCanvas(this.state.URL)
}

inputRecipient = (event) => {
  this.setState({ recipient: event.target.value });
}

handleURL = (event) => {
  this.setState({URL: event.target.value})
}

handleB64 = (event) => {
  this.setState({data: base64ToArrayBuffer(event.target.value) })
}

renderB64 = () => {
  this.drawData();
}


  render() {

    return (
      <div align="center" width="100%">
        <canvas id="canvas"/><br/>
        <canvas id="canvas2" width="100" height="100"/><br/>
        <label>Image URL
        <input type="text" onChange={this.handleURL}/>
        </label>
       <button onClick={this.click}>Load</button><br/>

       <label> Base64 Algorand Note to Render: 
        <input type="text"  width="500" height="100" onChange={this.handleB64}/>
        </label>
       <button onClick={this.renderB64}>Render</button><br/>

        <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"myAddress"} /><br />
        <h3>{this.state.myAddress}</h3><br />
        <form >
        <label>
          Recipient:
          <input type="text" onChange={this.inputRecipient} />
        </label><br></br>
        </form>
   <br></br><br></br>
        <AlgoSendButton
          index={0}
          recipient={this.state.recipient}
          amount={1}
          note={this.state.note}
          myAddress={this.state.myAddress}
          wallet={myAlgoWallet}
          context={this}
          returnTo={"txID"}
        />
      </div>
    )
  }
}

export default App;