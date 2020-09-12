import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;

  background: #EEEFFF; 
`

export const BackButton = styled.TouchableHighlight`
  flex-direction: column;
  align-items: center;

  background: #000;
  padding: 12px;
`

export const TextBack = styled.Text`
  font-size: 16px;
  color: #EEEFFF;
`

export const ContainerContent = styled.View`
  flex: 1;
`

export const TitleInput = styled.TextInput`
  padding: 10px; 

  font-size: 20px; 
  font-weight: bold;
  text-align: center;
`

export const ContainerHorizontal = styled.View`
  flex: 1;
  align-items: center;

  padding: 5px;
`

export const Picture = styled.Image`
  width: 100px;
  height: 100px; 
  margin-right: 10px;
  margin-bottom: 10px;
`

export const DescriptionInput = styled.TextInput`
  width: 95%;
  min-height: 80px;
  padding: 5px;

  font-size: 14px;
  background: #FFF;
  border-radius: 5px;
`

export const ContainerFooterHorizontal = styled.View`
  flex-direction: row;
  height: 40px;
  width: 95%;
  margin: 15px 0; 
`

export const NewDescriptionInput = styled.TextInput`
  width: 90%;
  height: 40px;

  background: #FFF;
  border-radius: 5px;
`

export const AddItemButton = styled.TouchableHighlight`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 40px;
  margin: 0 5px;

  background: #000;
  border-radius: 5px;
`

export const TextAddItem = styled.Text`
  font-size: 18px;
  color: #EEEFFF;
`

export const SaveButton = styled.TouchableHighlight`
  flex-direction: column;
  align-items: center;

  background: #0d50a3;
  padding: 12px;
`

export const TextSave = styled.Text`
  font-size: 16px;
  color: #EEEFFF;
`