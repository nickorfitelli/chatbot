import React, { Component } from "react";

export class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			zip: "",
			loading: true,
			trigger: false,
			result: false,
			error: false,
			error_msg: "",
			history: "",
		};

		this.triggetNext = this.triggetNext.bind(this);
	}

	componentWillMount() {
		const self = this;

		self.setState({ loading: true });
		// const hostname = process.env.REACT_APP_HOSTNAME;
		const url = `http://localhost:3001/history/:${self.props.steps.email.value}`;
		console.log(url);
		console.log(self.props.steps.email.value)

		//${self.props.steps.email.value}
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
				var output = JSON.stringify(responseAsJson);
				console.log(output);

				self.setState({ loading: false });
				self.setState({ history: output });
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
        const { loading, error, error_msg, history } = this.state;
        
        // let content = history.map((x, i) => x.message)
        // let body = (<div>{content}</div>);

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
			return (<div>
                    {history}
            </div>
                
            );
		}
	}
}

export default History;
