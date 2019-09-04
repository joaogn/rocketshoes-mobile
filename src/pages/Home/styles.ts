import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #191920;
`;

export const Product = styled.View`
  width: 220px;
  height: 358px;
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
  border-radius: 21px;
  background: #eee;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  color: #333333;
`;

export const ProductPrice = styled.Text`
  font-size: 21px;
  font-weight: bold;
  margin-top: 2px;
  color: #000;
`;

export const ProductButton = styled(RectButton)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  max-height: 42px;
  width: 200px;
  margin-top: auto;
`;

export const ProductItemContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 42px;
  max-width: 53px;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.2);
`;

export const ProductItemIcon = styled(Icon).attrs({
  name: 'add-shopping-cart',
  color: '#FFF',
  size: 24,
})`
  margin-left: 10px;
`;

export const ProductItemCounter = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 14px;
  margin-left: 2px;
`;

export const ProductButtonText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: 30px;
`;
