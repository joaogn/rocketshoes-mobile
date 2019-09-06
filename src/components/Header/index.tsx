import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

import { ApplicationState } from '../../store';

import logo from '../../assets/images/logo.png';

import { Container, BrasketContainer, Item } from './styles';

interface Nav {
  navigation: any;
}

type Props = Nav;

export default function Header({ navigation }: Props) {
  const cartSize = useSelector((state: ApplicationState) => state.cart.length);
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
