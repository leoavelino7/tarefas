import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: #EEEFFF;
`

export const ContainerFooter = styled.View`
  width: 100%;
  
  flex-direction: column-reverse;
`

export const NewListButton = styled.TouchableHighlight`
  flex-direction: column;
  align-items: center;

  background: #0d50a3;
  padding: 15px;

  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`

export const TextNewList = styled.Text`
  font-size: 16px;
  color: #EEEFFF;
`