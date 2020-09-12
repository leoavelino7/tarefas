import React from 'react'

import { ButtonSelect , Container, ButtonRemove, TextButtonRemove, TaskImage, TextButtonSelect } from './styles'

interface ISubTask {
  description: string
  done: boolean 
}

interface ITask {
  title: string
  description?: string
  picture?: string
  items?: Array<ISubTask>
}

interface IDoc {
  id: string
  rev: string
  body: ITask
}

interface IProps {
  doc: IDoc
  onSelect(): void
  onRemove(item: IDoc): void
}

export const SimpleList: React.FC<IProps> = ({doc, onSelect, onRemove}) => {
  const picture = doc.body.picture || 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'
  
  return (
    <ButtonSelect onPress={onSelect}>
      <Container>
        <ButtonRemove onPress={() => onRemove(doc)}>
          <TextButtonRemove>X</TextButtonRemove>
        </ButtonRemove>
        <TaskImage source={{uri: picture}} />
        <TextButtonSelect>{doc.body.title}</TextButtonSelect>
      </Container>
    </ButtonSelect>
  )
}
