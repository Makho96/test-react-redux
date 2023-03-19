import {FC} from 'react';

import { ButtonProps } from './types';
import './style.scss';

const Button: FC<ButtonProps> = (props) => {
  const {
    text,
    onclick,
    disabled = false,
    type = 'button'
  } = props;
  return (
    <button 
      onClick={onclick}
      disabled = {disabled}
      type = {type}
      >
      {text}
    </button>
  )
}

export default Button;