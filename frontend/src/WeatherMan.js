import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import Weather from "./Weather.js";
import Temp from "./Temp.js";
import History from "./History.js";

class Review extends Component {
	//init local state, assigning object to this.state

	constructor(props) {
		super(props);

		this.state = {
			firstname: "",
			lastname: "",
			zip: "",
			email: "",
			loading: true,
			set: false,
			result: "",
			trigger: false,
		};

		this.triggetNext = this.triggetNext.bind(this);
	}

	componentWillMount() {
		const { steps } = this.props;

		const { firstname, lastname, zipcode, email } = steps;

		this.setState({ firstname, lastname, zipcode, email });
	}

	triggetNext() {
		this.setState({ trigger: true }, () => {
			this.props.triggerNextStep();
		});
	}

	render() {
		const {
			firstname,
			lastname,
			zipcode,
			email,
			loading,
			set,
			result,
			trigger,
		} = this.state;

		return (
			<div style={{ overflow: "auto" }}>
				<h3>Summary</h3>

				<div style={{ textAlign: "left" }}>
					<b>First: </b> {firstname.value} <br></br>
					<b>Last: </b> {lastname.value} <br></br>
					<b>Zip: </b> {zipcode.value} <br></br>
					<b>Email: </b> {email.value} <br></br>
				</div>
			</div>
		);
	}
}

Review.propTypes = {
	steps: PropTypes.object,
};

Review.defaultProps = {
	steps: undefined,
};

///////////////////////////////////////////////////////////////////////////////

class SimpleForm extends Component {
	render() {
		return (
			<>
				<ChatBot
					steps={[
						{
							id: "1",
							message: "Hi! Is this your first time here?",
							trigger: "2",
						},
						{
							id: "2",
							options: [
								{
									value: "yes",
									label: "Yes",
									trigger: "firstnameQ",
								},
								{
									value: "no",
									label: "No",
									trigger: "emailQ",
								},
							],
						},
						{
							id: "firstnameQ",
							message: "What is your first name?",
							trigger: "firstname",
						},
						{
							id: "firstname",
							user: true,
							trigger: "lastnameQ",
							placeholder: "Enter First Name Here...",
						},
						{
							id: "lastnameQ",
							message:
								"Hi {previousValue}! What is your last name?",
							trigger: "lastname",
						},
						{
							id: "lastname",
							user: true,
							trigger: "zipcodeQ",
							placeholder: "Enter Last Name Here...",
						},
						{
							id: "zipcodeQ",
							message: "What is your zipcode?",
							trigger: "zipcode",
						},
						{
							id: "zipcode",
							user: true,
							trigger: "emailQ",
							placeholder: "Enter Zip Code Here...",
							validator: (value) => {
								let zip = value;
								console.log(zip);
								if (isNaN(zip)) {
									return "must be a valid zip";
								}
								return true;
							},
						},
						{
							id: "emailQ",
							message: "What is your email address?",
							trigger: "email",
						},
						{
							id: "email",
							user: true,
							trigger: "summary",
							placeholder: "Enter Email Here...",
						},
						{
							id: "summary",
							message: "Great! Check out your summary below",
							trigger: "review",
						},
						{
							id: "review",
							component: <Review />,
							asMessage: true,
							trigger: "update",
						},
						{
							id: "update",
							message: "Would you like to update anything?",
							trigger: "update-question",
						},
						{
							id: "update-question",
							options: [
								{
									value: "yes",
									label: "Yes",
									trigger: "update-yes",
								},
								{ value: "no", label: "No", trigger: "askme" },
							],
						},
						{
							id: "update-yes",
							message: "What field would you like to update?",
							trigger: "update-fields",
						},
						{
							id: "update-fields",
							options: [
								{
									value: "firstname",
									label: "First Name",
									trigger: "update-fname",
								},
								{
									value: "lastname",
									label: "Last Name",
									trigger: "update-lname",
								},
								{
									value: "zipcode",
									label: "Zip",
									trigger: "update-zip",
								},
								{
									value: "email",
									label: "Email",
									trigger: "update-email",
								},
							],
						},
						{
							id: "update-fname",
							update: "firstname",
							trigger: "summary",
						},
						{
							id: "update-lname",
							update: "lastname",
							trigger: "summary",
						},
						{
							id: "update-zip",
							update: "zipcode",
							trigger: "summary",
						},
						{
							id: "update-email",
							update: "email",
							trigger: "summary",
						},
						{
							id: "askme",
							message: "What would you like to know?",
							trigger: "command",
							placeholder: "Type Command Here...",
						},
						{
							id: "command",
							options: [
								{
									value: "weather",
									label: "Weather",
									trigger: "weather",
								},
								{
									value: "temperature",
									label: "Temp",
									trigger: "temperature",
								},
								{
									value: "history",
									label: "History",
									trigger: "history",
								},
								{
									value: "clear",
									label: "Clear History",
									trigger: "command",
								},
								{
									value: "update",
									label: "Update Info",
									trigger: "update-fields"
								}
							],
						},
						{
							id: "weather",
							component: <Weather />,
							asMessage: true,
							trigger: "command",
						},
						{
							id: "temperature",
							component: <Temp />,
							asMessage: true,
							trigger: "command",
						},
						{
							id: "history",
							component: <History />,
							asMessage: true,
							trigger: "command",
						},
					]}
					headerTitle="Weatherman"
					placeholder="..."
					customDelay="200"
					floating="false"
					width="700px"
				/>
			</>
		);
	}
}

export default SimpleForm;
