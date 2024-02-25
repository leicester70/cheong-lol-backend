import { createClient } from "@supabase/supabase-js";
import { CatInterface } from "../Interfaces/CatInterface"
import { AvailableCatBreeds } from "../Models/Cat";

export default class CatService implements CatInterface {
    constructor() { }

    async createNewCat(owner_uuid: string, name: string, gender: 'M' | 'F', breed: AvailableCatBreeds): Promise<void> {
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
            // public.PETS
            const { data: PETS_data, error: PETS_error } = await supabase
                .from('PETS')
                .insert([{ OWNER_UUID: owner_uuid, NAME: name, GENDER: gender, STATS: initialPetStats }])
                .select("*")
            if (!PETS_data || PETS_data.length === 0 || PETS_error) {
                if (PETS_error) console.log(PETS_error);
                throw new Error("Failed to create new pet in PETS table.");
            }
            const newPetUUID = PETS_data[0]["PET_UUID"]
            console.log(newPetUUID);
            // if no netpetuuid, please revert the PETS insertion
            if (!newPetUUID) {
                await supabase
                    .from('PETS')
                    .delete()
                    .match({ PET_UUID: newPetUUID });
                throw new Error("Failed to obtain new Pet UUID.");
            }
            // public.CATS
            const { error: CATS_error } = await supabase
                .from('CATS')
                .insert([{ PET_UUID: newPetUUID, BREED: breed }])
            if (CATS_error) {
                console.log(CATS_error);
                await supabase
                    .from('PETS')
                    .delete()
                    .match({ PET_UUID: newPetUUID });
                throw CATS_error;
            }

        } catch (error) {
            throw error
        }
    }
}