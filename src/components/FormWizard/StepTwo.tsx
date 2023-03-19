import Input from "../FormELements/Input";
import Button from "../FormELements/Button";
import { useForm } from "../../hooks/useform";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../utils/validator";

const StepTwo = () => {
  const {formState, inputHandler} = useForm({
    product_name: {
      value: '',
      valid: false
    },
    product_price: {
      value: '',
      valid: false
    },
    product_quantity: {
      value: '',
      valid: false
    },
  },
  false);
  console.log('form validity', formState)
  return (
    <div>
      <form>
        <div className="item_add_form">
          <Input
            type = {'text'}
            id = {'product_name'}
            label = {'Product Name'}
            placeholder = {'product'}
            onchange = {inputHandler}
            validators = {[VALIDATOR_REQUIRE()]}
          />
          <Input
            type = {'number'}
            id = {'product_price'}
            label = {'Product price in dollars'}
            placeholder = {'10'}
            onchange = {inputHandler}
            validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          />
          <Input
            type = {'text'}
            id = {'product_quantity'}
            label = {'Product quantiry'}
            placeholder = {'100pc'}
            onchange = {inputHandler}
            validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          />
        </div>
      </form>
    </div>
  )
}

export default StepTwo;