import React from 'react';

import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

import logo from '../../assets/images/logo.png';

import { Container, BrasketContainer, Item } from './styles';

interface Nav {
  navigation: any;
}

type Props = Nav;

export default function Header({ navigation }: Props) {
  return (
    <Container>
      <RectButton onPress={() => navigation.navigate('Home')}>
        <Image source={logo} width={185} height={24} />
      </RectButton>

      <BrasketContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <Item>{2}</Item>
      </BrasketContainer>
    </Container>
  );
}
