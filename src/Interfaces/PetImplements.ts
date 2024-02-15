export interface PetImplements {
    createNewPet(
        owner_uuid: string,
        name: string,
        gender: 'M' | 'F',
        catBreed: any
    ): void;
}
