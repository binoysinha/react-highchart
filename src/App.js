import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ProgressWizard from './components/ProgressWizard';

//##################################//
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

//##################################//

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

//#####################################//
const Component3 = () => <h1>Component3</h1>;

//#####################################//
const Component4 = () => <h1>Component4</h1>;

//#####################################//
const Component5 = () => <h1>Component5</h1>;

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			validationStore: {
				Component1: {
					isNameValid: false,
					isEmailValid: false
				},
				Component2: {
					isGenderValid: false,
					isAgeValid: false
				},
				Component3: {},
				Component4: {}
			},
			createFormStore: {
				name: '',
				email: ''
			},
			errObj: {
				Component1: false,
				Component2: false
			},
			disableButton: false
		};
	}

	getStore() {
		return this.state.createFormStore;
	}

	updateStoreHandler = (update, type) => {
		const createFormStore = {
			...this.state.createFormStore,
			...update
		};
		this.setState({
			createFormStore
		});

		let updObj = {};
		switch (type) {
			case 'Component1':
				updObj = {
					isNameValid: Boolean(update.name),
					isEmailValid: Boolean(update.email)
				};
				break;
			case 'Component2':
				updObj = {
					isGenderValid: Boolean(update.gender),
					isAgeValid: Boolean(update.age)
				};
				break;
			case 'Component3':
				updObj = {};
				break;
			case 'Component4':
				updObj = {};
				break;
			default:
		}
		const vlStore = {
			[type]: updObj
		};
		debugger;
		const updatedValidationStore = {
			...this.state.validationStore,
			...vlStore
		};

		this.setState({
			validationStore: updatedValidationStore
		});
	};

	validatonErrHandler = (comp, errfields) => {
		const errObj = {
			...this.state.errObj,
			[comp]: true
		};
		this.setState({ errObj }, () => {
			console.log(this.state);
		});
	};

	disableButton = flag => {
		this.setState({
			disableButton: flag
		});
	};
	isServerError = (errObj = {}) => {
		this.setState({ errObj });
		this.setState({ errorModal: true });
	};

	submitFormHandler = () => {
		console.log('Form Submitted ', this.state.createFormStore);
		alert('Form Submitted');
	};

	render() {
		const { disableButton, errObj, createFormStore } = this.state;

		const comp1 = {
			name: createFormStore.name,
			email: createFormStore.email
		};

		const steps = [
			{
				name: 'Component1',
				component: (
					<Component1
						getStore={() => this.getStore()}
						isInvalidField={errObj.Component1}
						updateStore={this.updateStoreHandler}
					/>
				),
				value: comp1
			},
			{
				name: 'Component2',
				component: (
					<Component2
						getStore={() => this.getStore()}
						isInvalidField={errObj.Component2}
						updateStore={this.updateStoreHandler}
					/>
				)
			},
			{
				name: 'Component3',
				component: (
					<Component3
						getStore={() => this.getStore()}
						isInvalidField={errObj.Component3}
						updateStore={this.updateStoreHandler}
					/>
				)
			},
			{
				name: 'Component4',
				component: (
					<Component4
						getStore={() => this.getStore()}
						isInvalidField={errObj.Component4}
						updateStore={this.updateStoreHandler}
					/>
				)
			},
			{
				name: 'Component5',
				component: (
					<Component5
						getStore={() => this.getStore()}
						errorFields={this.state.errorFields}
						updateStore={this.updateStoreHandler}
					/>
				)
			}
		];

		return (
			<div className="app">
				<ProgressWizard
					setValidationError={this.validatonErrHandler}
					validationProps={this.state.validationStore}
					onSubmitForm={this.submitFormHandler}
					disableButton={disableButton}
					numModeEdit={false}
					enableTopLabel={false}
					steps={steps}
					className="pg-wzd"
				/>
			</div>
		);
	}
}
