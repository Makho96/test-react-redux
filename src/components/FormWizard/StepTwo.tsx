
import { useDispatch, useSelector} from 'react-redux';
import nextId from 'react-id-generator';

import { addProduct, selectProducts } from '../../store/Products';
import ProductsTable from '../ProductsTable';
import Input from "../FormELements/Input";
import Button from "../FormELements/Button";
import { useForm } from "../../hooks/useform";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../utils/validator";
const StepTwo = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

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
  return (
    <div className='product-form-container'>
      <form>
        <div className="item_add_form">
          <div className='product-input-container'>
            <Input
              type = {'text'}
              id = {'product_name'}
              label = {'Product Name'}
              placeholder = {'product'}
              onchange = {inputHandler}
              validators = {[VALIDATOR_REQUIRE()]}
              errorText = {'This field is required'}
            />
          </div>
          <div className='product-input-container'>
            <Input
              type = {'number'}
              id = {'product_price'}
              label = {'Product price in dollars'}
              placeholder = {'10'}
              onchange = {inputHandler}
              validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
              errorText = {'This field is required, minimal value is 0'}
            />
          </div>
          <div className='product-input-container'>
            <Input
              type = {'number'}
              id = {'product_quantity'}
              label = {'Product quantiry'}
              placeholder = {'100'}
              onchange = {inputHandler}
              validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
              errorText = {'This field is required, minimal value is 0'}
            />
          </div>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
            }}>
            <Button 
              text="Add Product"
              disabled = {!formState.valid}
              onclick={() => {
                if (formState.valid) {
                  dispatch(addProduct({
                    id: nextId('product-item'),
                    name: formState.inputs.product_name.value,
                    price: formState.inputs.product_price.value,
                    quantity: formState.inputs.product_quantity.value
                  }))
                }
              }}
            />
          </div>
        </div>
      </form>
      <div 
        className='product-table-container'
        style={{
          padding: "0 10px",
          margin: "10px 0",
          height: '400px',
          overflowY: 'auto'
        }}
        >
        {products.length > 0 && <ProductsTable />}
      </div>
    </div>
  )
}

export default StepTwo;