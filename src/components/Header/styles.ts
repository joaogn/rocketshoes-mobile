import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #141419;
  padding: 10px;
  max-height: 64px;
`;

export const BrasketContainer = styled(RectButton)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Item = styled.Text`
  position: absolute;
  color: #fff;
  background: #7159c1;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  text-align: center;
  top: -10px;
  right: -8px;
  font-size: 12px;
`;
