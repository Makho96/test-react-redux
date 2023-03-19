import { HTMLInputTypeAttribute, ReactNode } from "react"

export interface InputProps {
  id: string,
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  onchange: (id: string, value: string, valid: boolean) => void;
  onblur?: () => any,
  label?: string,
  icon?: ReactNode,
  validators :Array<{
    type: string
  }>
  errorText?: string
}


export interface InputState {
  value: string,
  touched: boolean,
  valid: boolean
}

export type InputChangeActions = CHANGEACTION | TOUCHACTION


export enum InputStateActions {
  CHANGE = 'CHANGE',
  TOUCH = 'TOUCH'
}

interface CHANGEACTION {
  type: InputStateActions.CHANGE,
  payload: string,
  validator: Array<{
    type: string
  }>,
  inputType: HTMLInputTypeAttribute
}

interface TOUCHACTION {
  type: InputStateActions.TOUCH,
}