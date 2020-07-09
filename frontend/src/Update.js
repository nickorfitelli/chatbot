import React, { Component } from "react";

export class Update extends Component {
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

            let citydata = this.props.city;
            let weatherdata = this.props.weather;

            console.log(this.props.city)

            let message = "Today's weather in " + citydata + ": " + weatherdata;
            console.log(message)

			const data = {
				message: message,
                emailAddress: this.props.email,
			};
			const postData = () => {
				fetch("http://localhost:3001/addhist", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "same-origin",
				}).then(
					function (response) {
						console.log(data)
						
						return;
					},
					function (error) {
						return;
					}
				);
            };
            postData();
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

		if (error === true) {
			return (
				<div>
					Sorry there was a issue with adding to history log.
					Error Message: {error_msg}
				</div>
			);
		} else {
			return (
				<div>
				</div>
			);
		}
	}
}

export default Update;