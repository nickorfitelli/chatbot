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
                 console.log(output);
				 self.setState({ loading: false });
				 self.setState({ weather: output });
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
			trigger,
			result,
			error,
			error_msg,
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
					Today's Weather: {weather}
				</div>
			);
		}
	}
}

export default Weather;
