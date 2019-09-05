import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
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

interface State {
  products: Product[];
}

interface AmountObject {
  [key: string]: number;
}

interface ObjProps {
  amount: AmountObject;
}

interface DispatchProps {
  addToCartRequest(id: number): void;
}

type Props = ObjProps & DispatchProps;

class Home extends Component<Props, State> {
  state: State = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    const data = response.data.map((product: Product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddProduct = (product: Product) => {
    const { addToCartRequest } = this.props;
    console.tron.log('aqui');
    addToCartRequest(product.id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <ProductButton onPress={() => this.handleAddProduct(item)}>
                <ProductItemContainer>
                  <ProductItemIcon />
                  <ProductItemCounter>
                    {amount[item.id] || 0}
                  </ProductItemCounter>
                </ProductItemContainer>
                <ProductButtonText>ADICIONAR</ProductButtonText>
              </ProductButton>
            </Product>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  amount: state.cart.reduce((amount: AmountObject, product) => {
    amount[String(product.id)] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
