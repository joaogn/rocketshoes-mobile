import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Cart() {
  return (
    <Container>
      <Brasket>
        <Item>
          <Product>
            <ProductImage
              source={{
                uri:
                  'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
              }}
            />
            <ProductDescription>
              <ProductTitle>Tênis de Caminhada Leve Confortável</ProductTitle>
              <ProductPrice>R$200,00</ProductPrice>
            </ProductDescription>
          </Product>
          <AmountContainer>
            <AmountWrapper>
              <Icon name="remove-circle-outline" color="#7159c1" size={26} />
              <AmountInput value="1" />
              <Icon name="add-circle-outline" color="#7159c1" size={26} />
            </AmountWrapper>
            <AmountPrice>R$200,00</AmountPrice>
          </AmountContainer>
        </Item>
        <Total>
          <TotalTitle>TOTAL</TotalTitle>
          <TotalPrice>R$200,00</TotalPrice>
          <FinishButton>
            <FinishButtonText> FINALIZAR PEDIDO </FinishButtonText>
          </FinishButton>
        </Total>
      </Brasket>
    </Container>
  );
}
