import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const InputDescription = styled.TextInput`
  width: 70%;
  height: 40px; 
  border-color: #667; 
  border-width: 1px;

  border-radius: 5px;
`

export const RemoveButton = styled.TouchableHighlight`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 40px;
  margin: 10px 5px;

  background: red;
  border-radius: 5px;
` 

export const TextRemove = styled.Text`
  font-size: 14px;
  color: #EEEFFF;
`