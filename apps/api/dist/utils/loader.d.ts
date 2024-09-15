import { ObjectId, ObjectID } from 'mongodb';
export interface IDataFetcher<E extends {
    id: ObjectID;
}> {
    listByKeys(ids: ObjectId[]): Promise<E[]>;
}
export interface ILoader<Dto extends {
    id: ObjectID;
}> {
    loadMany(ids: ObjectID[]): Promise<Dto[]>;
    load(id: ObjectID): Promise<Dto>;
}
export declare class Loader<Dto extends {
    id: ObjectID;
}> implements ILoader<Dto> {
    protected fetcher: IDataFetcher<Dto>;
    protected notFoundData?: Omit<Dto, "id"> | undefined;
    private dataLoader;
    constructor(fetcher: IDataFetcher<Dto>, notFoundData?: Omit<Dto, "id"> | undefined);
    private batchIds;
    returnDefault(id: ObjectId): Dto;
    findByKey(data: Dto[], id: ObjectId): Dto | undefined;
    loadMany(ids: ObjectID[]): Promise<Dto[]>;
    load(id: ObjectID): Promise<Dto>;
}
