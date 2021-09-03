import './App.css';
import styled from 'styled-components'
import {useState} from 'react';
import hot from './images/hot.png';
import warm from './images/warm.png';
import cold from './images/cold.png';

function App() {

  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState('');
  // const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ee006bfbc8379347e6031631a523dc7`;
  async function getapi(input) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=2ee006bfbc8379347e6031631a523dc7`);
    var data = await response.json();
    if(response){
      setWeather(data);
    }else{
      alert('x')
    }
}
  const cityName = (e) => {
    e.preventDefault();
    if(!input)return
    getapi(input)
    setInput('');
  }
  // console.log(weather)
  // console.log(Math.round(weather.main.temp - 273.15))
  if(weather.length === 0){
    return(
      <Container style={{display: 'flex',justifyContent: 'center',flexDirection:'column'}}>
        <Title><h1>Weather App</h1><p></p></Title>
        <Search>
          <form onSubmit={cityName}>
            <h3>Enter City Name </h3>
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} name="city"></input>
          </form>
        </Search>
        {/* <CurrentWeather>
          <h3>Search A City</h3>
        </CurrentWeather> */}
      </Container>
    );
  }else{
    return (
      <Container className={Math.round(weather.main.temp - 273.15) >= 30 ? 'hot': Math.round(weather.main.temp - 273.15) < 30 && Math.round(weather.main.temp - 273.15)> 20? 'warm': 'cold'}>
        <div>
          <Title><h1>Weather App</h1><p></p></Title>
          <Search>
            <form onSubmit={cityName}>
              <h3>Enter City Name </h3>
              <input onChange={(e) => setInput(e.target.value)} type="text" value={input} name="city"></input>
            </form>
          </Search>
        </div>
        <CurrentWeather>
          <City>
            <h1>{weather.name} <small>{weather.sys.country}</small></h1>
            <p>{weather.weather[0].main}<img alt="weather" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img></p>
          </City>
          <Temperature>
            <h1>{Math.round(weather.main.temp - 273.15)}&#176;</h1>
            <MinMaxTemp>
              <small>min {Math.round(weather.main.temp_min - 273.15)}&#176;</small>
              <small>max {Math.round(weather.main.temp_max - 273.15)}&#176;</small>
            </MinMaxTemp>
          </Temperature>
          <FeelsLike>
            <p> Feels Like {Math.round(weather.main.feels_like - 273.15)}&#176;</p>
          </FeelsLike>
          <Humidity>
            <p>Humidity {Math.round(weather.main.humidity)}%</p>
          </Humidity>
        </CurrentWeather>
      </Container>
    );
  }
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('https://wallpaperaccess.com/full/1157326.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: background-image 2s ease-in-out;
  &.hot{
    background-image: url(${hot});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &.warm{
    background-image: url(${warm});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &.cold{
    background-image: url(${cold});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  @media only screen and (max-width: 426px){
    flex-direction: column;
  }
`
const Title = styled.div`
  h1{
    font-size: 2.5rem;
  }
`
const Search = styled.div`
display: flex;
flex-direction: column;
text-align: center;
  input{
    border: none;
    outline: none;
    width: 250px;
    height:35px;
    border-radius: 5px;
    background-color: azure;
    margin-top: 10px;
    padding: 10px;
  }
`
const CurrentWeather = styled.div`
  width: clamp(200px, 75vw, 300px);
  height: 50vh;
  border-radius: 10px;
  color: #FFFFFF;
  padding:20px;
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;
`
const City = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  P{
    display: flex;
    align-items: center;
  }
  h1{
    font-size: 2rem;
  }
`
// const SunRiseSet = styled.div`
//   p{
//     text-align:justify;
//   }
// `
// const Add = styled.div`
//   margin-left: 10px;
//   border: 1px solid white;
//   padding: 3px;
//   width: 50px;
//   text-align: center;
//   border-radius: 5px;
// `
const Temperature = styled.div`
  display: flex;
  margin-top: 10px;
  h1{
    font-size: 4rem;
    font-weight:100;
  }
`
const MinMaxTemp = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: center;
  justify-content: space-evenly;
`
const FeelsLike = styled.div`
  
`
const Humidity = styled.div`

`