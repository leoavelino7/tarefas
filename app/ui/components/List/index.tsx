import React, { useState, useEffect } from 'react'

import { Clipboard, TouchableHighlight, FlatList } from 'react-native'

import {  Container, BackButton, TextBack, ContainerContent, TitleInput, ContainerHorizontal, Picture, DescriptionInput, AddItemButton, TextAddItem, ContainerFooterHorizontal, NewDescriptionInput, SaveButton, TextSave } from './styles'

import { ListItem } from '../ListItem'

interface ISubTask {
  id?: string
  description: string
  done: boolean 
}

interface ITask {
  id?: string
  title: string
  description?: string
  picture?: string
  items: Array<ISubTask>
}

interface IDoc {
  id: string
  rev: string
  body: ITask
}

interface IProps {
  initialList: IDoc
  onActionDone(list: IDoc): void
}

export const List: React.FC<IProps> = ({initialList, onActionDone}) => {
  const [list, setList] = useState<IDoc>(initialList)
  const [newDescription, setNewDescription] = useState<string>('')

  function updateList(field: string, value: Array<ISubTask> | string) {
    const newBody = Object.assign({}, { ...list.body }, {[field]: value})
    const newList = Object.assign({}, list, { body: newBody })
    setList(newList)
  }

  function createListItem() {
    if(newDescription) {
      const newSubTask: ISubTask = { id: Date.now().toString(), description: newDescription, done: false}
      updateListItem(newSubTask)
      setNewDescription('')
    }
  }
  
  function updateListItem(subTask: ISubTask) {
    const itemIndex = list.body.items.findIndex(item => item.id === subTask.id)
    const newListItems = [...list.body.items]

    if(itemIndex >= 0) {
      newListItems[itemIndex] = subTask
    }else {
      newListItems.push(subTask)
    }
  
    updateList('items', newListItems)
  }

  function removeListItem(subTask: ISubTask) {
    const itemIndex = list.body.items.findIndex(item => item.id === subTask.id)
    const newListItems = [...list.body.items]

    newListItems.splice(itemIndex, 1)
    
    updateList('items', newListItems)
  }

  async function pasteImage() {
    const picture = await Clipboard.getString()
    const types = ['.png', '.jpg', '.jpeg']

    if(picture.startsWith('http') && types.some(type => picture.endsWith(type))) {
      updateList('picture', picture)
    }
  }

  function keyExtractor(subTask: ISubTask) {
    return subTask.description
  }

  useEffect(() => {
    if(!list.body.items) {
      list.body.items = []
    }
    setList(list)
  }, [])

  const picture = list.body.picture || 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
        
  return (
    <Container>
      <BackButton onPress={() => onActionDone(initialList)}>
        <TextBack> {'< Voltar'} </TextBack>
      </BackButton>
      <ContainerContent>
            <TitleInput 
                placeholder="Titulo"
                onChangeText={(text) => updateList('title', text)}
                value={list.body.title}
                />
            <ContainerHorizontal>
                <TouchableHighlight onPress={pasteImage} >
                    <Picture source={{uri: picture}} />
                </TouchableHighlight>
                <DescriptionInput
                    placeholder="Descricao"
                    onChangeText={(text) => updateList('description', text)}
                    value={list.body.description}
                    numberOfLines={3}
                    multiline={true} 
                />
              <ContainerFooterHorizontal>
                  <NewDescriptionInput 
                      placeholder="Novo Item"
                      value={newDescription}
                      onChangeText={(text) => {setNewDescription(text)}}
                  />
                  <AddItemButton onPress={createListItem}>
                    <TextAddItem>+</TextAddItem>
                  </AddItemButton>
              </ContainerFooterHorizontal>
              <FlatList
                  data={list.body.items}
                  keyExtractor={keyExtractor}
                  renderItem={({item}) => <ListItem subTask={item} onUpdate={updateListItem} onRemove={removeListItem} />}
              />
            </ContainerHorizontal>
        </ContainerContent>
        <SaveButton onPress={() => onActionDone(list)}>
          <TextSave>Salvar</TextSave>
        </SaveButton>
    </Container>
  )
}
