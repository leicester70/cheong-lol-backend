import { Pet } from './Pet';

export enum CatBreeds {
    Ragdoll = 'Ragdoll',
    ScottishFold = 'Scottish Fold',
    MaineCoon = 'Maine Coon',
    SelkirkRex = 'Selkirk Rex',
    AmericanBobtail = 'American Bobtail',
    Birman = 'Birman',
    Siamese = 'Siamese',
    RussianBlue = 'Russian Blue'
}

export class Cat extends Pet {
    private _breed: CatBreeds | undefined;

    public get breed(): CatBreeds | undefined {
        return this._breed;
    }
    public set breed(value: CatBreeds | undefined) {
        this._breed = value;
    }
}