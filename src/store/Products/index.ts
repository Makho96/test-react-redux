import {createSlice} from '@reduxjs/toolkit';

import { Product } from './types';

type SliceState = {
  products: Array<Product>
}

const initialState: SliceState = {
  products: []
}

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const {id, name, price, quantity } = action.payload
      state.products.push({
        id,
        name,
        price,
        quantity
      })
    },
    removeProduct: (state, action) => {
      const {productId} = action.payload;
      state.products = state.products.filter((product: Product) => product.id !== productId)
    },
    updateProduct: (state, action) => {
      const {
        id,
        name,
        price,
        quantity
      } = action.payload;
      state.products = state.products.map((product: Product) => {
        if (product.id === id) {
          return {
            id,
            name,
            price,
            quantity
          }
        } else {
          return product
        }
      })
    }
  }
});

export const {addProduct, removeProduct, updateProduct} = ProductsSlice.actions;

export const selectProducts = (state: any) => state.products.products;

export default ProductsSlice.reducer;