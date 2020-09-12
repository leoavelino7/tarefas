import React from 'react'

import { Switch } from 'react-native'

import {  Container, InputDescription, RemoveButton, TextRemove } from './styles'

interface ISubTask {
  id?: string
  description: string
  done: boolean 
}

interface IProps {
  subTask: ISubTask
  onUpdate(subTask: ISubTask): void
  onRemove(subTask: ISubTask): void
}

export const ListItem: React.FC<IProps>  = ({subTask, onUpdate, onRemove} ) => {
  
  function updateItem(field: string, value: boolean | string) {
    const newSubTask = Object.assign({}, subTask, {[field]: value})
    onUpdate(newSubTask)
  }
  
  function removeItem() {
    onRemove(subTask)
  }

  return (
    <Container>
      <Switch value={subTask.done} onValueChange={(done: boolean) => updateItem('done', done)} />
      <InputDescription 
        placeholder="Descricao"
        value={subTask.description}
        onChangeText={(text: string) => updateItem('description', text)}
        editable={!subTask.done}
      />
      <RemoveButton onPress={() => removeItem()}>
        <TextRemove>X</TextRemove>
      </RemoveButton>
    </Container>
  )
}
