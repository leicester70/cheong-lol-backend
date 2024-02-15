import { createClient, PostgrestError } from "@supabase/supabase-js";
import { PetImplements } from "../Interfaces/PetImplements"
import { AvailableCatBreeds } from "../Models/Cat";

export default class CatService implements PetImplements {
    constructor() { }

    async createNewPet(owner_uuid: string, name: string, gender: 'M' | 'F', breed: AvailableCatBreeds): Promise<void> {
        try {
            let initialPetStats = {
                cleanlinessPoints: 100,
                happinessPoints: 100,
                healthPoints: 100,
                hungerPoints: 100,
                thirstPoints: 100
            };
            const supabase = createClient(
                `${process.env.PUBLIC_SUPABASE_URL}`,
                `${process.env.PUBLIC_SUPABASE_ANON_KEY}`
            );
            // TODO: unreachable code, fix this shit
            // public.PETS
            const { data: PETS_data, error: PETS_error } = await supabase
                .from('PETS')
                .insert([{ OWNER_UUID: owner_uuid, NAME: name, GENDER: gender, STATS: initialPetStats }])
            const newPetUUID = PETS_data!["PET_UUID"]
            console.log(PETS_data);

            if (PETS_error) throw PETS_error as PostgrestError;
            // public.CATS
            const { error: CATS_error } = await supabase
                .from('CATS')
                .insert([{ PET_UUID: newPetUUID, BREED: breed }])
            if (CATS_error) throw CATS_error as PostgrestError;
            console.log(CATS_error);
        } catch (error) {
            throw error
        }
    }
}