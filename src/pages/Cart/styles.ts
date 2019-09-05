import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #191920;
`;

export const Brasket = styled.View`
  background-color: #fff;
  margin: 20px 20px 0 20px;
  border-radius: 4px;
`;

export const Item = styled.View`
  flex-direction: column;
  padding: 15px;
`;

export const Product = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
  background: #eee;
`;

export const ProductDescription = styled.View`
  margin-left: 5px;
  margin-right: 20px;
  max-width: 163px;
  justify-content: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  color: #333333;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 2px;
  color: #000;
`;

export const AmountContainer = styled.View`
  background-color: #eee;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  margin-top: 5px;
`;

export const AmountWrapper = styled.View`
  flex-direction: row;
`;

export const AmountInput = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
  max-height: 26px;
  text-align: center;
`;

export const AmountPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
`;

export const Total = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

export const TotalTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

export const TotalPrice = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const FinishButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  background: #7159c1;
  border-radius: 4px;
  height: 42px;
  border-radius: 4px;
  padding: 12px;
  margin: 35px 10px 10px 10px;
  width: 90%;
`;

export const FinishButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
