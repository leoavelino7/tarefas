import React, { useState } from 'react'

import { FlatList, RefreshControl } from 'react-native'

import { SimpleList } from '../../components/SimpleList'

import { Container } from './styled'

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
  isLoading: boolean
  docs: Array<IDoc>
  onRemove(docToRemove: IDoc): void
  onSelect(doc: IDoc): void
}

export const ListView = ({docs, isLoading, onSelect, onRemove }: IProps) => {

  function keyExtractor(doc: IDoc) {
    return doc.id
  }

  return (
    <Container>
      <FlatList 
        data={docs}
        keyExtractor={keyExtractor}
        renderItem={({item}) => <SimpleList doc={item} onRemove={onRemove} onSelect={() => onSelect(item)} />}
        numColumns={3}
        refreshControl={<RefreshControl refreshing={isLoading} />}
      />
    </Container>
  )
}