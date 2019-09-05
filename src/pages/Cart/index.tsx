import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
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

interface DispatchProps {
  removeFromCart(id: number): void;
  updateAmountRequest(id: number, amount: number): void;
}

type Props = CartProps & DispatchProps;

function Cart({ products, total, updateAmountRequest, removeFromCart }: Props) {
  function deleteProduct(id: number) {
    removeFromCart(id);
  }
  function addToCart(product: Product) {
    updateAmountRequest(product.id, product.amount + 1);
  }
  function decreaseFromCart(product: Product) {
    updateAmountRequest(product.id, product.amount - 1);
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

const mapStateToProps = (state: ApplicationState) => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
