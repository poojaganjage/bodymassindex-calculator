import {useState} from 'react';
import Slider from 'react-rangeslider';
import "react-rangeslider/lib/index.css";
import './App.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [bmiValue, setBmiValue] = useState('');
  const [bmiText, setBmiText] = useState('');
  const [chonkVisibility, setChonkVisibility] = useState('invisibleChonk');
  const [text, setText] = useState('');
  const [resultChonk, setResultChonk] = useState('visibleChonk');
  const AllChonkImg = {
    slimChonk: [
      "./images/slim/1.jpg",
      "./images/slim/2.jpg",
      "./images/slim/3.jpg",
      "./images/slim/4.jpg",
    ],
    normalChonk: [
      "./images/normal/1.jpg",
      "./images/normal/2.jpg",
      "./images/normal/3.jpg",
      "./images/normal/4.jpg",
      "./images/normal/5.jpg",
    ],
    fatChonk: [
      "./images/fat/1.jpg",
      "./images/fat/2.jpg",
      "./images/fat/3.jpg",
      "./images/fat/4.jpg",
    ],
    tooFatChonk: [
      "./images/2fat/1.jpg",
      "./images/2fat/2.jpg",
      "./images/2fat/3.jpg",
      "./images/2fat/4.jpg",
      "./images/2fat/5.jpg",
      "./images/2fat/6.jpg",
    ],
  };

  const minHeight = 95;
  const maxHeight = 220;
  const minWeight = 10;
  const maxWeight = 300;
  const slimThre = 18.5;
  const normalThre = 24.9;
  const fatThre = 29.9;

  const handleChangeHeight = (e) => {
    setHeight(e.target.value);
  }

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  }

  const handleChangeHeightSlider = (value) => {
    setHeight(value);
  }

  const handleChangeWeightSlider = (value) => {
    setWeight(value);
  }

  const handleKeyPress = (source, e) => {
    let allowedChars = ".0123456789";
    let currentChar = e.key;
    console.log(currentChar);
    let found = false;
    // console.log(allowedChars.length);
    for(let i = 0; i < allowedChars.length; i++) {
      if(currentChar === allowedChars[i]) {
        found = true;
      }
    }
    console.log(found);
    if(found === false) {
      e.preventDefault();
      return;
    }
    let currentValue = '';
    if(source === 'height') {
      console.log(height);
      currentValue = parseInt(height + currentChar); // + is for concatenation.
      console.log(currentValue);
      if(currentValue > maxHeight) {
        e.preventDefault();
      }
    } else {
      currentValue = parseInt(weight + currentChar);
      if(currentValue > maxWeight) {
        e.preventDefault();
      }
    }
    if(currentValue === 0) {
      e.preventDefault();
    }
  }

  const classifyResult = (result) => {
    if(result < slimThre) {
      return 'slim';
    }
    if(result <= normalThre) {
      return 'normal';
    }
    if(result <= fatThre) {
      return 'fat';
    }
    return 'tooFat';
  }

  const validate = () => {
    setHeightError('');
    setWeightError('');

    let heightErrStr = '';
    let weightErrStr = '';

    if(!height) {
      heightErrStr = 'Please Enter Some Height';
    } else if(height <= minHeight) {
      heightErrStr = 'Please Enter Height Greater Than 95';
    } else if(height >= maxHeight) {
      heightErrStr = 'Please Enter Height Less Than 220';
    }

    if(!weight) {
      weightErrStr = 'Please Enter Some Weight';
    } else if(weight <= minWeight) {
      weightErrStr = 'Please Enter Weight Greater Than 95';
    } else if(weight >= maxWeight) {
      weightErrStr = 'Please Enter Weight Less Than 220';
    }

    if(heightErrStr || weightErrStr) {
      setHeightError(heightErrStr);
      setWeightError(weightErrStr);
      return false;
    }
    return true;
  }

  const calculateBmi = () => {
    if(!validate()) {
      console.log("Validation");
      return;
    }

    console.log("Not Validation");

    let bmi = (weight / (((height/100) * height)/100)).toFixed(1);
    let chonks = null;
    let resultString = '';
    switch(classifyResult(bmi)) {
      case 'slim': {
        chonks = AllChonkImg.slimChonk;
        resultString = 'You are preety slim, have KitKat';
        break;
      }
      case 'normal': {
        chonks = AllChonkImg.normalChonk;
        resultString = 'You are okay for now';
        break;
      }
      case 'fat': {
        chonks = AllChonkImg.fatChonk;
        resultString = 'You are getting kind of fat';
        break;
      }
      case 'tooFat': {
        chonks = AllChonkImg.tooFatChonk;
        resultString = 'You are too fat';
        break;
      }
      default: {}
    }

    console.log(chonks);

    // Getting random images & avoiding duplicates.
    let randNum = Math.floor(Math.random() * chonks.length);
    let randChonk = chonks[randNum];
    console.log(randChonk);

    setBmiText(resultString);
    setBmiValue(bmi);
    setChonkVisibility('visibleChonk');
    setText('invisibleChonk');
    setResultChonk(randChonk);
  }

  const clear = (e) => {
    e.preventDefault();
    setHeight('');
    setWeight('');
    setBmiValue('');
    setChonkVisibility('invisibleChonk');
    setHeightError('');
    setWeightError('');
    setText('visibleChonk');
  }
  
  return (
    <div id='container'>
      <div id='title'>
        <h1>Calculate your body mass index</h1>
      </div>
      <form>
        <div className='unit'>
          <p>Height (95cm - 220cm)</p>
        </div>
        <input 
          type='number' 
          name='height' 
          step='1' 
          placeholder='cm' 
          min={minHeight} 
          max={maxHeight} 
          value={height} 
          onChange={handleChangeHeight} 
          onKeyPress={handleKeyPress.bind(this, 'height')} 
        />
        <div className='error'>
          {heightError}
        </div>
        <div className='slider'>
          <Slider 
            min={minHeight} 
            max={maxHeight} 
            steps={1}
            value={height} 
            onChange={handleChangeHeightSlider}
          />
        </div>
        <br />
        <div className='unit'>
          <p>Weight 10kg - 300kg</p>
        </div>
        <input 
          type='number' 
          name='weight' 
          step='0.5' 
          placeholder='kg' 
          min={minWeight} 
          max={maxWeight} 
          value={weight} 
          onChange={handleChangeWeight}
          onKeyPress={handleKeyPress.bind(this, 'weight')} 
        />
        <div className='error'>
          {weightError}
        </div>
        <div className='slider'>
          <Slider 
            min={minWeight} 
            max={maxWeight} 
            steps={0.5}
            value={weight} 
            onChange={handleChangeWeightSlider}
          />
        </div>
        <br />
        <div id='buttons-container'>
          <button 
            className='button' 
            onClick={
              (e) => {
                e.preventDefault();
                calculateBmi();
              }
            }
          >
            Calculate
          </button>
          <br />
          <button 
            className='button' 
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </form>
      <div className={chonkVisibility}>
        <div id="image">
          <img src={resultChonk} alt="pictures of cats" />
        </div>
        <div id='result-top-text'>
          <p>Your Current BMI: {bmiValue}</p>
        </div>
        <div id='bmi-text'>
          {bmiText}
        </div>
      </div>
      <div className={text}>
        <div id="text">
          Body mass index, abbreviated BMI, is a key index for relating weight
          to height.
          <br />
          <br />
          BMI is a person's weight in kilograms (kg) divided by his or her
          height in meters squared. The National Institutes of Health (NIH) now
          defines normal weight, overweight, and obesity according to BMI rather
          than the traditional height/weight charts.
          <ul>
            <li>Overweight is a BMI of 25-29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks.
        </div>
      </div>
    </div>
  );
}
export default App;
