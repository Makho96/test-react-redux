import {useReducer, FC, ChangeEvent, useEffect} from 'react';
import { validate } from '../../utils/validator';

import {InputProps, InputState, InputChangeActions, InputStateActions} from './types';

import './style.scss'

const inputReducer = (state: InputState, action: InputChangeActions) => {
  switch(action.type) {
    case InputStateActions.CHANGE: {
      return {
        ...state,
        value: action.payload,
        valid: validate(action.payload, action.validator)
      }
    }
    case InputStateActions.TOUCH: {
      return {
        ...state,
        touched: true
      }
    }
    default : return state
  }

}

const Input: FC<InputProps> =  (props) => {
  const {
    id,
    type,
    placeholder,
    onchange,
    onblur,
    label,
    icon,
    validators,
    errorText,
    ...rest
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    touched: false,
    valid: !(validators.length > 0)
  });

  
  const {value, valid, touched} = inputState;

  useEffect(() => {
    onchange(id, value, valid)
  }, [id, onchange, value, valid])

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: InputStateActions.CHANGE,
      payload: e.target.value,
      validator: validators,
      inputType: type
    })
  }
  

  const blurHandler = () => {
    dispatch({
      type: InputStateActions.TOUCH
    });
    onblur && onblur();
  }

  if (type === 'textarea') {
    return (
      <div className='input_outer_container'>
        {label ? <label htmlFor={id} className = 'input_label'>{label}</label> : <></>}
        <div className='input_inner_container'>
          <textarea
            id={id}
            placeholder = {placeholder}
            onChange = {changeHandler}
            onBlur = {blurHandler}
            value = {inputState.value}
            name = {id}
            {...rest}
            >
          </textarea>
          {icon ? <div>{icon}</div> :<></>}
          {errorText && !valid && touched && <span className='error_text'>{errorText}</span>}
        </div>
      </div>
    )
  }
  return (
    <div className='input_outer_container'>
      {label ? <label htmlFor={id} className = 'input_label'>{label}</label> : <></>}
      <div className='input_inner_container'>
        <input 
          id={id}
          type={type}
          placeholder = {placeholder}
          onChange = {changeHandler}
          onBlur = {blurHandler}
          value = {inputState.value}
          name = {id}
          {...rest}
        />
        {icon? <div className='icon_container'>{icon}</div> :<></>}
      </div>
      {errorText && !valid && touched && <span className='error_text'>{errorText}</span>}
    </div>
  )
}

export default Input