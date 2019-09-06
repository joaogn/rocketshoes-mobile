import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { ApplicationState } from '../../store';

import {
  Container,
  Brasket,
  Item,
  Product,
  ProductTitle,
  ProductImage,
  ProductDescription,
  ProductPrice,
  AmountContainer,
  AmountWrapper,
  AmountInput,
  AmountPrice,
  Total,
  TotalTitle,
  TotalPrice,
  FinishButton,
  FinishButtonText,
} from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  priceFormatted?: string;
  subtotal?: string;
}

interface CartProps {
  products: Product[];
  total: string;
}

export default function Cart() {
  const dispatch = useDispatch();

  const products = useSelector((state: ApplicationState) =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      priceFormatted: formatPrice(product.price),
    }))
  );

  const total = useSelector((state: ApplicationState) =>
    formatPrice(
      state.cart.reduce(
        (sunTotal, product) => sunTotal + product.price * product.amount,
        0
      )
    )
  );

  function deleteProduct(id: number) {
    dispatch(CartActions.removeFromCart(id));
  }
  function addToCart(product: Product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }
  function decreaseFromCart(product: Product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <Brasket>
        <FlatList
          data={products}
          extraData={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Item>
              <Product>
                <ProductImage source={{ uri: item.image }} />
                <ProductDescription>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPrice>{item.priceFormatted}</ProductPrice>
                </ProductDescription>
                <RectButton onPress={() => deleteProduct(item.id)}>
                  <Icon name="delete-forever" color="#7159c1" size={26} />
                </RectButton>
              </Product>
              <AmountContainer>
                <AmountWrapper>
                  <RectButton onPress={() => decreaseFromCart(item)}>
                    <Icon
                      name="remove-circle-outline"
                      color="#7159c1"
                      size={26}
                    />
                  </RectButton>
                  <AmountInput value={String(item.amount)} />
                  <RectButton onPress={() => addToCart(item)}>
                    <Icon name="add-circle-outline" color="#7159c1" size={26} />
                  </RectButton>
                </AmountWrapper>
                <AmountPrice>{item.subtotal}</AmountPrice>
              </AmountContainer>
            </Item>
          )}
        />
        <Total>
          <TotalTitle>TOTAL</TotalTitle>
          <TotalPrice>{total}</TotalPrice>
          <FinishButton>
            <FinishButtonText> FINALIZAR PEDIDO </FinishButtonText>
          </FinishButton>
        </Total>
      </Brasket>
    </Container>
  );
}
