import {Fragment} from 'react';

import {useSelector} from 'react-redux';
import {selectProducts} from '../../store/Products';
import { Product } from '../../store/Products/types';
import ProductTableItem from './ProductItem';
import './style.scss';

const ProductsTable = () => {
  const products = useSelector(selectProducts);

  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Price
          </th>
          <th>
            Quantity
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: Product) => {
          return (
            <Fragment key={`product_${item.id}}`}>
              <ProductTableItem
                id = {item.id}
                name = {item.name}
                price = {item.price}
                quantity = {item.quantity}
              />
            </Fragment>
          )
        })}
      </tbody>
    </table>
  );
}

export default ProductsTable;