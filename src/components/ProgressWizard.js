/**
 * Progress Wizard component
 *
 * @version 1.0.0
 * @author [Binoy Sinha](https://github.com/binoy-sinha)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles/ProgressWizard.css';

/**
 * update the header nav states via classes so they can be styled via css
 * @param {number} indx
 * @param {number} length
 */
const getNavStates = (indx, length) => {
	let styles = [];
	for (let i = 0; i < length; i++) {
		if (i < indx) {
			styles.push('done');
		} else if (i === indx) {
			styles.push('doing');
		} else {
			styles.push('todo');
		}
	}
	return { current: indx, styles: styles };
};

/**
 * Determine which step are we in
 * @param {number} currentStep
 * @param {number} stepsLength
 */
const checkNavState = (currentStep, stepsLength) => {
	if (currentStep > 0 && currentStep < stepsLength - 1) {
		return {
			showPreviousBtn: true,
			showNextBtn: true
		};
	} else if (currentStep === 0) {
		return {
			showPreviousBtn: false,
			showNextBtn: true
		};
	} else {
		return {
			showPreviousBtn: true,
			showNextBtn: false
		};
	}
};

/**
 * This is React functional component  for progress wizard.
 * The number of component to be rendered is provided as props.
 * Progress wizard can be rendered diffrently depended on the props.
 * Navigation to previous and next component can be done by clicking on upper num listing(numModeEdit props need to be )
 * (NOTE)Max component to be allowed is 5.
 * See the props section for user defined config.
 */

export default class ProgressWizard extends PureComponent {
	/**
	 * Intializes the state.
	 */
	constructor(props) {
		super(props);
		this.state = {
			showPreviousBtn: false,
			showNextBtn: true,
			compState: 0,
			navState: getNavStates(0, this.props.steps.length)
		};
	}

	/**
	 * Intializes the state.
	 * @param {number} x - The x value.
	 * @param {number} y - The y value.
	 */
	setNavState = next => {
		this.setState({
			navState: getNavStates(next, this.props.steps.length)
		});
		if (next < this.props.steps.length) {
			this.setState({ compState: next });
		}
		this.setState(checkNavState(next, this.props.steps.length));
	};
	/**
	 * handles keydown on enter being pressed in any Child component input area.
	 * In this case it goes to the next (ignore textareas as they should allow line breaks)
	 */
	handleKeyDown = evt => {
		if (evt.which === 13) {
			// this.next();
		}
	};

	/**
	 * this utility method lets Child components invoke a direct jump to another step
	 */
	handleOnClick = evt => {
		const targetVal = Number(evt.currentTarget.getAttribute('data-value'));

		if (targetVal > this.state.compState) {
			if (!this.doValidation()) {
				return false;
			}
		}
		if (targetVal === this.props.steps.length - 1 && this.state.compState === this.props.steps.length - 1) {
			this.setNavState(this.props.steps.length);
		} else {
			this.setNavState(targetVal);
		}
	};

	/**
	 * This utility method checks the fields for the corresponding rendered component.
	 * It invokes a prop function
	 *  @returns {boolean} If it is return validation for the field is success.
	 */
	doValidation = () => {
		const compName = this.props.steps[this.state.compState].name;
		const validationProps = { ...this.props.validationProps };
		let isValidObj = validationProps[`${compName}`];
		let isValid = true;

		for (let key in isValidObj) {
			if (isValidObj.hasOwnProperty(key)) {
				if (!isValidObj[key]) {
					const errField = { [key]: false };
					isValidObj = { ...isValidObj, ...errField };
					isValid = false;
				}
			}
		}
		this.props.setValidationError(compName, isValidObj);
		return isValid;
	};

	/**
	 * move to next component via next button if validation is success for current component
	 */
	nextComponent = () => {
		if (this.doValidation()) {
			this.setNavState(this.state.compState + 1);
			// const compName = this.props.steps[this.state.compState].name;
			if (this.state.compState === this.props.steps.length - 1) {
				this.props.onSubmitForm();
			}
		}
	};

	/**
	 * move to previous component via prev button.
	 */
	previousComponent = () => {
		if (this.state.compState > 0) {
			this.setNavState(this.state.compState - 1);
		}
	};

	// get the classmame of steps
	getClassName = (className, i) => className + '-' + this.state.navState.styles[i];

	/**
	 * This method renders the top numbering for thecomponent.
	 *  Next and previous navigation can be done by clicking on the corresponding text.
	 *  @returns {component} It returns list of previous completed state
	 */
	renderEditSteps = () =>
		this.props.steps.map((s, i) => (
			<li className={this.getClassName('prog-wzd__edittrckr', i)} key={i}>
				<div className="track-num">
					<span>0{i + 1}</span>
					<span className="prog-wzd__edittrckr__label">{this.props.steps[i].name}</span>
				</div>
				<span className="prog-wzd__edittrckr__edit-btn" onClick={this.handleOnClick} data-value={i}>
					Edit
				</span>
			</li>
		));

	/**
	 * This method renders the top numbering for thecomponent.
	 *  Next and previous navigation can be done by clicking on the corresponding component number.
	 *  Click functionality is active only when numModeEdit prop value is true
	 *  @returns {component} It returns list of numbered component.
	 */
	renderSteps = () =>
		this.props.steps.map((s, i) => (
			<li
				className={[this.getClassName('prog-wzd__progtrckr', i), this.props.numModeEdit ? null : 'disabled-click'].join(
					' '
				)}
				onClick={this.handleOnClick}
				key={i}
				data-value={i}
			>
				<div className="track-num">
					<span>{i + 1}</span>
				</div>
				<span className="prog-wzd__progtrckr__label">{this.props.steps[i].name}</span>
				<span className="checked" />
			</li>
		));

	// main render of progress-wizard container
	render() {
		const { steps, enableTopLabel, disableButton, showNavigation, numModeEdit, className } = this.props;
		const { compState, showPreviousBtn } = this.state;

		const componentPointer = steps[this.state.compState].component;
		const compToRender = React.cloneElement(componentPointer);

		return (
			<div className={`prog-wzd ${className}`} onKeyDown={this.handleKeyDown}>
				<div className="prog-wzd__progtrckrWrp">
					<ol className={['prog-wzd__progtrckr', enableTopLabel ? 'inline-label' : null].join(' ')}>
						{this.renderSteps()}
					</ol>
				</div>
				<div className="prog-wzd__content">
					{!numModeEdit ? <ul className="prog-wzd__content-edit">{this.renderEditSteps()}</ul> : null}
					<div className="prog-wzd__content-form">{compToRender}</div>
					{!disableButton ? (
						<div style={showNavigation ? {} : { display: 'none' }} className="prog-wzd__content__btn_grp">
							{compState === 0 ? (
								<button className="prog-wzd__content__btn_grp_btn btn--white" onClick={this.previousComponent}>
									Cancel
								</button>
							) : (
								<button
									style={showPreviousBtn ? {} : { display: 'none' }}
									className="prog-wzd__content__btn_grp_btn btn--white"
									onClick={this.previousComponent}
								>
									Previous
								</button>
							)}

							<button className="prog-wzd__content__btn_grp_btn btn--blue" onClick={this.nextComponent}>
								{compState === steps.length - 1 ? 'Create' : 'Next'}
							</button>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

ProgressWizard.propTypes = {
	/**
	 * Steps ia an array of component to be rendered
	 * Each element in the array is an object, Which takes three property
	 * name: Name of the component to be rendered (mandatory)
	 * component: Component to be rendered (mandatory)
	 * componetFieldValue: FieldValue of the rendered component (optional)
	 */
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			component: PropTypes.element.isRequired,
			componetFieldValue: PropTypes.object
		})
	).isRequired,
	/**
	 * This props contains the validation property for the component state
	 */
	validationProps: PropTypes.object,
	/**
	 * This props is used for the navigation for previous and next button
	 */
	showNavigation: PropTypes.bool,
	/**
	 * This props is used for the propagation of the error to the component state
	 */
	setValidationError: PropTypes.func,
	/**
	 * This props is used for the propagation of the error to the component state
	 */
	onSubmitForm: PropTypes.func,
	/**
	 * This props is used to  disable the buttons. This is useful to hide the buttons during async calls.
	 */
	disableButton: PropTypes.bool,
	/**
	 * This props is used to  render the component name inline to num step component.
	 */
	enableTopLabel: PropTypes.bool,
	/**
	 * This props is used to enable edit mode for the number steps component
	 */
	numModeEdit: PropTypes.bool,
	/**
	 * This props is used to  set the classname for the progress wizard component
	 */
	className: PropTypes.string
};

ProgressWizard.defaultProps = {
	showNavigation: true,
	enableTopLabel: false,
	numModeEdit: false,
	className: ''
};
