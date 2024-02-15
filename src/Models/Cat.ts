import { Pet } from './Pet';

export enum AvailableCatBreeds {
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
    private _breed: AvailableCatBreeds | undefined;

    public get breed(): AvailableCatBreeds | undefined {
        return this._breed;
    }
    public set breed(value: AvailableCatBreeds | undefined) {
        this._breed = value;
    }
}
