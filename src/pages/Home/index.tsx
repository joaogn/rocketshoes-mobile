import React, { Component } from 'react';

import { FlatList } from 'react-native';
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

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface State {
  products: Product[];
}

export default class Home extends Component<any, State> {
  state: State = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    console.tron.log(response);
    this.setState({ products: response.data });
  }

  render() {
    const { products } = this.state;
    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.price}</ProductPrice>
              <ProductButton>
                <ProductItemContainer>
                  <ProductItemIcon />
                  <ProductItemCounter>{2}</ProductItemCounter>
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
