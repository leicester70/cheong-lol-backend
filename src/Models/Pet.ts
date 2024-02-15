import { NumberRange } from '../Types/tNumberRange';

export type tPetStats = {
    healthPoints?: NumberRange<0, 100>;
    hungerPoints?: NumberRange<0, 100>;
    thirstPoints?: NumberRange<0, 100>;
    cleanlinessPoints?: NumberRange<0, 100>;
    happinessPoints?: NumberRange<0, 100>;
}

export abstract class Pet {
    ownerUuid: string; // fk relation to supabase auth.user.id
    petUuid: string;
    createdDate: Date;
    name: string;
    gender: 'M' | 'F';
    stats: tPetStats | undefined;

    constructor(
        ownerUuid: string,
        petUuid: string,
        createdDate: Date,
        name: string,
        gender: 'M' | 'F'
    ) {
        this.ownerUuid = ownerUuid;
        this.petUuid = petUuid;
        this.createdDate = createdDate;
        this.name = name;
        this.gender = gender;
    }

    // TODO: add what pets can do
}
