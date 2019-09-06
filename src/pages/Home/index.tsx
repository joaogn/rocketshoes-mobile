import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { formatPrice } from '../../util/format';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductButton,
  ProductItemContainer,
  ProductItemIcon,
  ProductItemCounter,
  ProductButtonText,
} from './styles';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';
import { ApplicationState } from '../../store';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  priceFormatted?: string;
}

interface AmountObject {
  [key: string]: number;
}

interface ObjProps {
  amount: AmountObject;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const amount: AmountObject = useSelector((state: ApplicationState) =>
    state.cart.reduce((amountTotal: AmountObject, product) => {
      amountTotal[String(product.id)] = product.amount;
      return amountTotal;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      const data = response.data.map((product: Product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }

    getProducts();
  }, []);

  function handleAddProduct(product: Product) {
    dispatch(CartActions.addToCartRequest(product.id));
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        extraData={amount}
        keyExtractor={product => String(product.id)}
        renderItem={({ item }) => (
          <Product>
            <ProductImage source={{ uri: item.image }} />
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
            <ProductButton onPress={() => handleAddProduct(item)}>
              <ProductItemContainer>
                <ProductItemIcon />
                <ProductItemCounter>{amount[item.id] || 0}</ProductItemCounter>
              </ProductItemContainer>
              <ProductButtonText>ADICIONAR</ProductButtonText>
            </ProductButton>
          </Product>
        )}
      />
    </Container>
  );
}
