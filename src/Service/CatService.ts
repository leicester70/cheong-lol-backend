import { createClient, PostgrestError } from "@supabase/supabase-js";
import { CatBreeds } from "../Models/Cat";
import { PetImplements } from "../Interfaces/PetImplements"

export default class CatService implements PetImplements {
    constructor() { }

    async createNewPet(owner_uuid: string, name: string, gender: 'M' | 'F', catBreed: any): Promise<void> {
        try {
            let initialPetStats = {
                cleanlinessPoints: 100,
                happinessPoints: 100,
                healthPoints: 100,
                hungerPoints: 100,
                thirstPoints: 100
            };
            if (!Object.values(CatBreeds).includes(catBreed)) {
                throw `Invalid Cat Breed - ${Object.values(CatBreeds)} does not include: ${catBreed}`;
            }
            const supabase = createClient(
                `${process.env.PUBLIC_SUPABASE_URL}`,
                `${process.env.PUBLIC_SUPABASE_ANON_KEY}`
            );
            const { data, error } = await supabase
                .from('PETS')
                .insert([{ owner_uuid: owner_uuid, name: name, gender: gender, stats: initialPetStats }])
                .select();
            if (error) throw error as PostgrestError;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}