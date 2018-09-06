import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Component1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.getStore().name || '',
			email: props.getStore().email || ''
		};
	}

	updateNameHandler = event => {
		const val = event.target.value;

		this.setState({ name: val }, () => {
			this.updateProps();
		});
	};

	updateEmailHandler = event => {
		const val = event.target.value;

		this.setState({ email: val }, () => {
			this.updateProps();
		});
	};

	_grabUserInput() {
		return {
			name: this.state.name,
			email: this.state.email
		};
	}

	updateProps = () => {
		const userInput = this._grabUserInput();
		this.props.updateStore(
			{
				...userInput
			},
			'Component1'
		);
	};

	render() {
		const { email, name } = this.state;
		const errClass = {};
		if (this.props.isInvalidField) {
			errClass.nameInValid = !name;
			errClass.emailInValid = !email;
		}
		return (
			<div className="">
				<h1>Component1</h1>
				<div className="form-row">
					<label className="">Name</label>
					<input
						type="text"
						value={name}
						placeholder="John Doe"
						className={errClass.nameInValid ? 'invalid-field' : null}
						onChange={this.updateNameHandler}
					/>
					{errClass.nameInValid ? <div className="">Name Cant't be empty</div> : null}
				</div>
				<div className="form-row">
					<label className="">Email</label>
					<input
						type="email"
						value={email}
						placeholder="john.smith@example.com"
						className={errClass.emailInValid ? 'invalid-field' : null}
						onChange={this.updateEmailHandler}
					/>
					{errClass.emailInValid ? <div className="">Email Cant't be empty</div> : null}
				</div>
			</div>
		);
	}
}

Component1.propTypes = {
	getStore: PropTypes.func.isRequired,
	updateStore: PropTypes.func.isRequired,
	isInvalidField: PropTypes.bool
};
export default Component1;
