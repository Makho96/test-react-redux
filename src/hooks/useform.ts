import { useCallback, useReducer } from 'react';

import { FormStateChangeActions, FormStateChangeActionTypes, FormState, Inputs } from "./types"

const formReducer = (state: FormState, action: FormStateChangeActions) =>{
  switch (action.type) {
    case (FormStateChangeActionTypes.INPUT_CHANGE): {
      let isFormValid = true;
      for (const input in state.inputs) {
        if (!state.inputs[input]) {
          continue;
        }
        if (input === action.inputId) {
          isFormValid = isFormValid && action.valid
        } else {
          isFormValid = isFormValid && state.inputs[input].valid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.payload,
            valid: action.valid
          }
        },
        valid: isFormValid 
      }
    };
    case (FormStateChangeActionTypes.SET_DATA): {
      return {
        inputs: action.inputs,
        valid: action.valid
      }
    }
    default: return state
  }
}

export const useForm = (initialInputs: Inputs, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    valid: initialFormValidity
  });

  const inputHandler = useCallback((id: string, value: string, valid: boolean): void => {
    dispatch({
      type: FormStateChangeActionTypes.INPUT_CHANGE,
      payload: value,
      valid: valid,
      inputId: id
    });
  }, []);

  const setFormInitialData = useCallback((inputData: any, valid: boolean) => {
    dispatch({
      type: FormStateChangeActionTypes.SET_DATA,
      inputs: inputData,
      valid: valid,
    });
  }, []);

  return {formState, inputHandler, setFormInitialData};
}
