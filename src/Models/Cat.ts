import { NumberRange } from '../Types/NumberRange';
import { Pet } from './Pet';

export enum CatBreeds {
    Ragdoll = 'Ragdoll',
    ScottishFold = 'Scottish Fold',
    MaineCoon = 'Maine Coon',
    SelkirkRex = 'Selkirk Rex',
    AmericanBobtail = 'American Bobtail',
    Birman = 'Birman',
    Siamese = 'Siamese'
}

export class Cat extends Pet {
    private breed: Enumerator;

}