
export type FormStateChangeActions  = SET_INITIAL_STATE | UPDATE_FORM_DATA

export enum FormStateChangeActionTypes {
  INPUT_CHANGE = 'INPUT_CHANGE',
  SET_DATA = 'SET_DATA'
}

export interface FormState {
  inputs: Inputs,
  valid: boolean
}

export interface Inputs {
  [key: string]: {
    value: string | boolean,
    valid: boolean
  }
}

interface SET_INITIAL_STATE {
  type: FormStateChangeActionTypes.SET_DATA,
  inputs: Inputs,
  valid: boolean,
}

interface UPDATE_FORM_DATA {
  type: FormStateChangeActionTypes.INPUT_CHANGE,
  payload: string,
  valid: boolean,
  inputId: string
}