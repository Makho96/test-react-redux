import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import './style.scss';



const FormWizard = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  const steps: React.ReactElement[] = [
    <StepOne changeStep={() => {setActiveStep(1)}}/>,
    <StepTwo />
  ]

  return (
    <div className="wizard_outer_container">
      <div className="wizard_container">
        <div className="wizard_header">
          <ul className="wizard_stepper">
            {steps.map((_: React.ReactElement, index: number, arr: React.ReactElement[]) => {
              return (
                <li key={`stepper_${index}`}>
                  <div className={"step-container"}>
                    <div className={`step ${activeStep >= index ? 'active' : ''}`}>
                      {index + 1}
                    </div>
                    {index < arr.length - 1 && <div className={`step-line ${activeStep - 1 >= index ? 'active' : ''}`}></div>}                    
                  </div>
                  
                </li> 
              )
            })}
          </ul>
        </div>
        <div className="wizard_body">
          {steps[activeStep]}
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default FormWizard;