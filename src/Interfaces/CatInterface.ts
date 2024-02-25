export interface CatInterface {
    createNewCat(
        owner_uuid: string,
        name: string,
        gender: 'M' | 'F',
        catBreed: any
    ): void;
}
