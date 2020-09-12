import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const {width} = Dimensions.get('window');

export const ButtonSelect = styled.TouchableHighlight`
  width: ${width / 2 - 20}px; 
  margin: 2px; 
  margin-bottom: 30px; 
  border-width: 1px; 
  border-color: #AAA; 
  padding: 5px;
  margin: 10px;
`

export const Container = styled.View`
  position: relative;
  background: #EEEFFF;
`

export const ButtonRemove = styled.TouchableHighlight`
  justify-content: center;

  position: absolute; 
  right: 0; 
  top: 0; 
  z-index: 2;

  width: 25px;
  height: 25px;

  background: red;
  border-radius: 5px;
`
export const TextButtonRemove = styled.Text`
  color: #EEEFFF; 
  text-align: center;
` 

export const TaskImage = styled.Image`
  height: ${width / 3 - 20}px;
`

export const TextButtonSelect = styled.Text`
  font-weight: bold;
` 