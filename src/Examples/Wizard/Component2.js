import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Component2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gender: props.getStore().gender || '',
			age: props.getStore().age || ''
		};
	}

	updateGenderHandler = event => {
		const val = event.target.value;

		this.setState({ gender: val }, () => {
			this.updateProps();
		});
	};

	updateAgeHandler = event => {
		const val = event.target.value;

		this.setState({ age: val }, () => {
			this.updateProps();
		});
	};

	_grabUserInput() {
		return {
			gender: this.state.gender,
			age: this.state.age
		};
	}

	updateProps = () => {
		const userInput = this._grabUserInput();
		this.props.updateStore(
			{
				...userInput
			},
			'Component2'
		);
	};

	render() {
		const { gender, age } = this.state;
		const errClass = {};
		if (this.props.isInvalidField) {
			errClass.genderInValid = !gender;
			errClass.ageInValid = !age;
		}
		return (
			<div className="">
				<h1>Component2</h1>

				<div className="form-row">
					<label className="">Gender</label>
					<select
						className={errClass.genderInValid ? 'invalid-field' : null}
						value={gender}
						onChange={this.updateGenderHandler}
					>
						<option value="">Please select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
					{errClass.genderInValid ? <div className="">Gender Can't be empty</div> : null}
				</div>
				<div className="form-row">
					<label className="">Choose age group</label>
					<select className={errClass.ageInValid ? 'invalid-field' : null} value={age} onChange={this.updateAgeHandler}>
						<option value="">Please select</option>

						<option value="0-13">0-13</option>
						<option value="13-24">13-24</option>
						<option value="24+">24+</option>
					</select>
					{errClass.ageInValid ? <div className="">Age Cant't be empty</div> : null}
				</div>
			</div>
		);
	}
}

Component2.propTypes = {
	getStore: PropTypes.func.isRequired,
	updateStore: PropTypes.func.isRequired,
	isInvalidField: PropTypes.bool
};
export default Component2;
