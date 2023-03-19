import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import { removeProduct, updateProduct } from '../../../store/Products';
import { ProductPropTypes } from "./types";
import { useForm } from '../../../hooks/useform';
import Input from '../../FormELements/Input';

import { CloseSvg, EditSvg, FileCheckSvg } from '../../../Constants/icons';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from '../../utils/validator';

import './style.scss';
import Swal from 'sweetalert2';

const ProductTableItem: FC <ProductPropTypes> = (props) => {
  const dispatch = useDispatch();

  const {id, name, price, quantity} = props;

  const {formState, inputHandler, setFormInitialData} = useForm({
    product_name: {
      value: name,
      valid: true
    },
    product_price: {
      value: price.toString(),
      valid: true
    },
    product_quantity: {
      value: quantity.toString(),
      valid: true
    },
  },
  true);

  const [editActive, setEditActive] = useState<boolean>(false);
  
  const handleEditToggle = () => {
    setEditActive((prevState: boolean) => !prevState);
  }


  const handleDelete = () => {
    Swal.fire({
      title: 'Do you really want to remove this product?',
      icon: "error",
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        dispatch(removeProduct({
          productId: id
        }))
        Swal.fire({
          icon: "success",
          text: "Product Removed Successfully"
        })
      }
    })
  }


  const handleEdit = (edit: boolean) => {
    if (edit) {
      Swal.fire({
        title: "Do you really want to save upates ?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        showConfirmButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateProduct({
            id: id,
            name: formState.inputs.product_name.value.toString(),
            price: formState.inputs.product_price.value.toString(),
            quantity: formState.inputs.product_quantity.value.toString()
          }))
          setEditActive(false);
        }
      })
    } else {
      Swal.fire({
        title: "Do you want to discard changes ?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: 'Go back',
        showConfirmButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          setFormInitialData({
            product_name: {
              value: name,
              valid: true
            },
            product_price: {
              value: price.toString(),
              valid: true
            },
            product_quantity: {
              value: quantity.toString(),
              valid: true
            },
          },
          true);
          setEditActive(false);
        }
      })
    }

  }

  return (
    <tr>
      <td>{ editActive?
            (<Input
              type = {'text'}
              id = {'product_name'}
              placeholder = {'product'}
              onchange = {inputHandler}
              validators = {[VALIDATOR_REQUIRE()]}
              defaultValue = {formState.inputs.product_name.value.toString()}
              defaultValid = {formState.inputs.product_name.valid}
              errorText = {'This field is required'}
            />)
             : name
          }
        </td>
      <td>{editActive 
        ? (
          <Input
            type = {'number'}
            id = {'product_price'}
            placeholder = {'10'}
            onchange = {inputHandler}
            validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            defaultValue = {formState.inputs.product_price.value.toString()}
            defaultValid = {formState.inputs.product_price.valid}
            errorText = {'This field is required, minimal value is 0'}
          />
        ) : 
        price}
      </td>
      <td>{editActive 
        ? (
          <Input
            type = {'number'}
            id = {'product_quantity'}
            placeholder = {'100'}
            onchange = {inputHandler}
            validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            defaultValue = {formState.inputs.product_quantity.value.toString()}
            defaultValid = {formState.inputs.product_quantity.valid}
            errorText = {'This field is required, minimal value is 0'}
          />
        ) : 
        quantity}
      </td>
      <td>
        <div className='product-icons-container'>
          {editActive ? <>
            <div className='product-icon-container'  onClick={() => handleEdit(true)}>
              <FileCheckSvg />
            </div>
            <div className='product-icon-container' onClick={() =>handleEdit(false)}><CloseSvg /></div> 
            
          </> :
            <>
              <div className='product-icon-container'  onClick={handleEditToggle}>
                <EditSvg />
              </div>
              <div className='product-icon-container' onClick={handleDelete}>
                <CloseSvg />
              </div>
            </> 
          }
        </div>
      </td>
    </tr>
  )
}

export default ProductTableItem;
