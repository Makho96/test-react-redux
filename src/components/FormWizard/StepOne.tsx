import React, {FC} from 'react';
import Swal from 'sweetalert2';

import { useForm } from "../../hooks/useform";
import Input from "../FormELements/Input";
import Select from "../FormELements/Select";
import Radio from "../FormELements/Radio/Radio";
import RadioGroup from "../FormELements/RadioGroup";
import Button from "../FormELements/Button";

import countries from "../../Constants/countries";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_MIN } from "../utils/validator";
import { UserSvg, PhoneSvg, EmailSvg, ShowSvg, GlobeSvg } from "../../Constants/icons";


const StepOne: FC<{
  changeStep: () => void
}> = (props) => {
  const {changeStep} = props;
  const {formState, inputHandler} = useForm({
    username: {
      value: '',
      valid: false
    },
    age: {
      value: '',
      valid: false
    },
    email: {
      value: '',
      valid: false
    },
    password: {
      value: '',
      valid: false
    },
    more_info: {
      value: '',
      valid: true
    },
    gender: {
      value: false,
      valid: true
    },
    country: {
      value: '',
      valid: true
    }
  },
  false);
  return (
    <form style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '700px',
      padding: '30px'
      }}>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1
        }}>
        <Input 
          type = {'text'}
          id = {'username'}
          label = {'Username'}
          placeholder = {'John'}
          onchange = {inputHandler}
          validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
          icon = {<UserSvg />}
          errorText = {'this field is required, minimum character number is 4'}
        />
      </div>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1
        }}>
        <Input 
          type={'email'}
          id = {'email'}
          label = {'Email'}
          placeholder = {'type email'}
          onchange = {inputHandler}
          validators = {[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          icon = {<EmailSvg />}
          errorText = {'this field is required, email must be in correct format'}
        />
        </div>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1
        }}>
        <Input 
          type={'number'}
          id = {'age'}
          label = {'age'}
          placeholder = {'Enter Your Age'}
          onchange = {inputHandler}
          validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(18)]}
          icon = {<PhoneSvg />}
          errorText = {'this field is required, age must be more than 18'}
        />
      </div>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1
        }}>
        <Input 
          type={'password'}
          id = {'password'}
          label = {'Password'}
          placeholder = {'type password'}
          onchange = {inputHandler}
          validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          icon = {<ShowSvg />}
          errorText = {'this field is required, password should be at least 6 characters'}
        />
      </div>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 2
      }}>
        <Select 
          id = {'country'}
          list={countries}
          onchange = {inputHandler}
          placeholder = {'choose country'}
          label = {'country'}
          icon = {<GlobeSvg />}
        />
      </div>
      <div style={{
        width: '48%',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1
        }}>
          <RadioGroup
            title="gender"
            >
            <>
            <div style={{marginRight: '10px'}}>
              <Radio 
                id = {'gender'}
                label = {'Male'}
                name = {'gender'}
                onchange = {inputHandler}
                checked = {false}
              />
            </div>
            <div>
              <Radio
                id = {'gender'}
                label = {'Female'}
                name = {'gender'}
                onchange = {inputHandler}
                checked = {false}
              />
            </div>
            </>
          </RadioGroup>
      </div>
      <div style={{
        width: '100%',
        position: 'relative',
        zIndex: 1
        }}>
        <Input 
         type={'textarea'}
         id = {'more_info'}
         label = {'tell us more'}
         onchange = {inputHandler}
         validators = {[]}
        />
      </div>
      <div style={{
        width: '100%',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center'
        }}
        >
          <Button 
            text="Register"
            onclick={() => {
              if (formState.valid) {
                Swal.fire({
                  title: 'User created successfully',
                  icon: 'success',
                  showConfirmButton: true,
                  confirmButtonText: 'Okay',
                  didClose : () => {
                    changeStep()
                  }
                })
              }
            }}
            disabled = {!formState.valid}
          />
      </div>
    </form>
  )
}

export default StepOne;