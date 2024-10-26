import {Component} from 'react'
import {IoSearch} from 'react-icons/io5'
import './App.css'

class App extends Component {
  state = {searchInput: '', currentWeather: [], lat: '', lon: '', fiveDaysForecast: []}

  onChangeSearchKeyword = event => {
    this.setState({searchInput: event.target.value})
  }

  searchWeatherData = async () => {
    const apiKey = 'ce176e1a8c2d53bfdf35f3eaf92f0263'

    await this.getLatLong()

    await this.getCurrentWeather()

    await this.getFiveDayForecast()

  }

  getLatLong = async () => {
    const apiKey = 'ce176e1a8c2d53bfdf35f3eaf92f0263'
    const {searchInput} = this.state

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.toLowerCase()}&limit=5&appid=${apiKey}`
        console.log(url)
    const options = {
        method: 'GET'
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()

    const lat = jsonData[0].lat
    const lon = jsonData[0].lon

    this.setState({lat: lat, lon: lon})

  }

  getCurrentWeather = async () => {
    const {lat,lon} = this.state

    const apiKey = 'ce176e1a8c2d53bfdf35f3eaf92f0263'

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const responesData = await response.json()

    this.setState({currentWeather: {
      temperature: responesData.main.temp,
      humidity: responesData.main.humidity,
      windSpeed: responesData.wind.speed,
      weatherConditions: responesData.weather
    }})
  }

  getFiveDayForecast = async () => {
    const {lat, lon} = this.state
    const apiKey = 'ce176e1a8c2d53bfdf35f3eaf92f0263'

    console.log()

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const responesData = await response.json()

    console.log(responesData)
    this.setState({fiveDaysForecast: responesData})
  }

  displayCurrentWeather = () => {
    const {currentWeather} = this.state
    const {temperature, humidity, windSpeed, weatherConditions} = currentWeather
    const {description} = weatherConditions[0]

    return (
      <div>
        <h1>Current Weather</h1>
        <p>Temperature: {temperature}</p>
        <p>Humidity: {humidity}</p>
        <p>Windspeed: {windSpeed}</p>
        <p>Weather conditions: {description}</p>
      </div>
    )
  }

  // displayFiveDaysForecast = () => {

  // }

  render() {
    const {currentWeather, fiveDaysForecast} = this.state
    return (
      <div>
        <h1>weather forecast</h1>
        <div className="searchInputElement">
          <input type="search" onChange={this.onChangeSearchKeyword} />
          <button type="button" onClick={this.searchWeatherData}>
            <IoSearch />
          </button>
        </div>

        {
          currentWeather.length !== 0 && fiveDaysForecast.length !== 0 ? this.displayCurrentWeather() : null
        }


      </div>
    )
  }
}

export default App
