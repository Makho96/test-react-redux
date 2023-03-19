import {FC} from 'react';

import { RadioGroupProps } from './types';

import './style.scss'

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    title,
    children
  } = props
  return (
    <div className='radio_group_container'>
      <div className='label'>{title}</div>
      <div className='elements'>
        {children}
      </div>
    </div>
  )
}

export default RadioGroup