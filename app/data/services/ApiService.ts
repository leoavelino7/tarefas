import {RNSync} from 'rnsync';

const url = 'http://192.168.0.108:5984';

interface IDataStore {
  changeConnectionState(isConnected: boolean): void
  hasConnection(): boolean
  pull(): Promise<boolean>
  push(): Promise<boolean>
  list(): Promise<Array<IDoc>>
  update(doc: Object): Promise<IDoc>
  remove(id: string): Promise<string>
}

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

interface IStore {
  init(): void
  replicatePull(): boolean
  replicatePush(): boolean
  find(obj: {}): Array<IDoc>
  create(task: ITask): IDoc
  update(docId: string, docRev: string, docBody: Object ): IDoc
  delete(id: string): void
}

export class DataStore implements IDataStore {
    isConnected: boolean
    dbUrl: string
    dbName: string
    store: IStore

    constructor(dbName: string){
        this.isConnected = false
        this.dbUrl = url;
        this.dbName = dbName;
        this.store = new RNSync(this.dbUrl, this.dbName);
        this.store.init();
    }

    changeConnectionState(isConnected: boolean) {
        if(isConnected){
            this.push();
        }
        this.isConnected = isConnected
    }

    hasConnection(){
        return this.isConnected;
    }

    async pull(){
        if(this.hasConnection()){
            return this.store.replicatePull();
        }
        return false;
    }

    async push(){
        if(this.hasConnection()){
            return this.store.replicatePush();
        }
        return false;
    }

    async list(){
        await this.pull();
        const docs = await this.store.find({});
        return docs;
    }

    async create(task: ITask){
        const newDoc = await this.store.create(task);
        await this.push();
        return newDoc;
    }

    async update(doc: IDoc){
        const newDoc = await this.store.update(doc.id, doc.rev, doc.body);
        await this.push();
        return newDoc;
    }

    async remove(id: string){
        await this.store.delete(id);
        await this.push();
        return id;
    }
}