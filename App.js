import React from 'react';
import { Alert} from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
const API_KEY = "xxxx";

export default class extends React.Component {

  state = {
    isLoading: true
  };

  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
  }

  getLocation = async () => {
    try {
    await Location.requestPermissionsAsync();
  
    const {coords: { latitude, longitude}} = await Location.getCurrentPositionAsync();
    //send to api 
      
    } catch (error){
      this.setState({isLoading: false})
      this.getWeather(latitude, longitude)
      Alert.alert('Cant find you.', 'So Sad')
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const {isLoading } = this.state;
    return isLoading ? <Loading /> : null ;
  }
}