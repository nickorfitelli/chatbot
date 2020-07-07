import React, { Component } from "react";

export class Weather extends Component {
	constructor(props) {
		super(props);

		this.state = {
            zip: "",
			loading: true,
			weather: "",
			trigger: false,
			result: false,
			error: false,
            error_msg: "",
            city:"",
            img: ""
		};

		this.triggetNext = this.triggetNext.bind(this);
	}

	componentWillMount() {
        const self = this;
        console.log(self.props.steps.zipcode.value)
		self.setState({ loading: true });
		// const hostname = process.env.REACT_APP_HOSTNAME;
		const url = `http://api.openweathermap.org/data/2.5/weather?zip=${self.props.steps.zipcode.value},us&appid=defbd6e67d1870e6b1d66a6cfe34f95b`;

		fetch(url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// // Do stuff with the JSON
                 var output = responseAsJson.weather[0].description;
                 var cityname = responseAsJson.name;
                 var imgurl = `http://openweathermap.org/img/wn/${responseAsJson.weather[0].icon}@2x.png`
                 output = output.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
                 console.log(cityname)
                 console.log(output);
				 self.setState({ loading: false });
                 self.setState({ weather: output });
                 self.setState({ city: cityname });
				 self.setState({ img: imgurl });
                 
                 
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
				self.setState({ error_msg: error.message });
				self.setState({ loading: false });
				self.setState({ error: true });
				self.props.triggerNextStep();
			});
	}

	triggetNext() {
		this.setState({ trigger: true }, () => {
			this.props.triggerNextStep();
		});
	}

	render() {
		const {
			loading,
			weather,
			error,
            error_msg,
            city,
            img
		} = this.state;

		if (loading) {
			return <p>Just a minute, looking that up...</p>;
		}

		if (error === true) {
			return (
				<div>
					Sorry there was a issue with your request, please try again.
					Error Message: {error_msg}
				</div>
			);
		} else {
			return (
				<div>
					Today's Weather in {city}: {weather}  <br></br>
                    <img src= {img} width = "50px"></img>
				</div>
			);
		}
	}
}

export default Weather;
