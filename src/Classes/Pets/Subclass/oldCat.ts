// import { ExecutionResults } from "Interfaces/ExecuteResult";
import { PetController } from '../oldPetInitializer';
import { PostgrestError, createClient } from '@supabase/supabase-js';

export class CatController extends PetController {
    // ref https://www.thesprucepets.com/cute-cat-breeds-5176271
    breed?: string;
    possibleBreedsArr: string[] = [
        'Ragdoll',
        'Scottish Fold',
        'Maine Coon',
        'Selkirk Rex',
        'American Bobtail',
        'Birman',
        'Siamese'
    ];
    meow(): void {
        this.logAction('meowed');
    }

    async createNewCat(owner_uuid: string, name: string, gender: 'M' | 'F', catBreed: any): Promise<void> {
        try {
            this.name = name;
            this.gender = gender;
            this.stats = {
                cleanlinessPoints: 100,
                happinessPoints: 100,
                healthPoints: 100,
                hungerPoints: 100,
                thirstPoints: 100
            };
            if (!this.possibleBreedsArr.includes(catBreed)) {
                throw `${this.possibleBreedsArr} does not include -> ${catBreed}`;
            } // sorry just want to double validate this because idfk what im really doing
            this.breed = catBreed;

            console.log(this);
            console.log('ok');
            const supabase = createClient(
                `${process.env.PUBLIC_SUPABASE_URL}`,
                `${process.env.PUBLIC_SUPABASE_ANON_KEY}`
            );
            const { data, error } = await supabase
                .from('PETS')
                .insert([{ owner_uuid: owner_uuid, name: this.name, gender: this.gender, stats: this.stats }])
                .select();
            if (error) throw error as PostgrestError;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}
