import {FC} from 'react';

import { RadioPropTypes } from "./types";

const Radio: FC<RadioPropTypes> = (props) => {
  const {
    id,
    label,
    name,
    onchange
  } = props;
  const changeHandler = () => {
    console.log('change')
    onchange(id, label, true)
  }
  return (
    <div className='radion_container'>
      <label htmlFor={label}>{label}</label>
      <input 
        id={label}
        type='radio'
        name = {name}
        onChange={changeHandler}
      />
    </div>
  )
}

export default Radio;