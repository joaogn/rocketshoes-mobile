import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

// eslint-disable-next-line no-unused-vars
import { ApplicationState } from '../../store';

import logo from '../../assets/images/logo.png';

import { Container, BrasketContainer, Item } from './styles';

interface Nav {
  navigation: any;
}

interface HeaderTypes {
  cartSize?: number;
}

type Props = Nav & HeaderTypes;

function Header({ navigation, cartSize }: Props) {
  return (
    <Container>
      <RectButton onPress={() => navigation.navigate('Home')}>
        <Image source={logo} width={185} height={24} />
      </RectButton>

      <BrasketContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <Item>{cartSize}</Item>
      </BrasketContainer>
    </Container>
  );
}

export default connect((state: ApplicationState) => ({
  cartSize: state.cart.length,
}))(Header);
