import React, { useState, useEffect } from 'react';
import BackgroundFetch from "react-native-background-fetch";
import { useNetInfo } from '@react-native-community/netinfo';

import { Modal } from 'react-native';

import { ListService } from './app/data/services/ListService'

import { Container, ContainerFooter, NewListButton, TextNewList } from './styles'
import { ListView } from './app/ui/views/ListView';
import { List } from './app/ui/components/List';

interface ISubTask {
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

const defaultSelectedDoc = {
  id: '',
  rev: '',
  body: {title: '', items: []}
}

export const App: React.FC = () => {
  const netInfo = useNetInfo()
  
  const [docs, setDocs] = useState<Array<IDoc>>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedDoc, setSelectedDoc] = useState<IDoc>(defaultSelectedDoc)
  const [isLoading, setIsLoading] = useState(false)
  
  async function getDocs() {
    setIsLoading(true)
    const docs = await ListService.list();
    
    setDocs(docs)
    setIsLoading(false)
    return docs;
  }
  
  function selectDoc(doc: IDoc){
    setSelectedDoc(doc)
    setModalVisible(true)
  }

  async function createDoc(){
    const newDoc = await ListService.create({title: 'Nova Lista', description: '', picture: 'https://images.freeimages.com/images/large-previews/69c/spiral-bound-notebook-1-1240231.jpg', items: []})
    const docs = await ListService.list();

    setDocs(docs)
    setSelectedDoc(newDoc)
  }

  async function updateDoc(newDoc: IDoc){
    await ListService.update(newDoc);
    await getDocs()
    setSelectedDoc(defaultSelectedDoc)
    setModalVisible(false)
  }

  async function removeDoc(docToRemove: IDoc){
    setIsLoading(true)
    await ListService.remove(docToRemove.id);
    await getDocs()
    setIsLoading(false)
  }

  useEffect(() => {
    ListService.changeConnectionState(netInfo.isConnected)
    getDocs()
  }, [netInfo.isConnected])
  
  useEffect(() => {
    function backgroundUpdate() {
      BackgroundFetch.configure({
        minimumFetchInterval: 5,
        forceReload: false,
        stopOnTerminate: false,
        startOnBoot: true
      }, async () => {
        console.log("sincronizando...");
        await ListService.push();
        await getDocs();
        BackgroundFetch.finish();
      }, (error) => {
        console.log('error');
      })
    }

    backgroundUpdate()
  }, [])

  return (
    <>
    <Container>
        <ListView isLoading={isLoading} docs={docs} onRemove={removeDoc} onSelect={selectDoc} />
        <Modal animationType="fade" transparent={false} visible={modalVisible}>
          <List initialList={selectedDoc} onActionDone={updateDoc} />
        </Modal>
    </Container>
      <ContainerFooter>
        <NewListButton onPress={createDoc}>
          <TextNewList>
            + Nova lista
          </TextNewList>
        </NewListButton>
      </ContainerFooter>
    </>
  );
};