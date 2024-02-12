import { NumberRange } from '../../Types/NumberRange';

export abstract class PetController {
    // what the db will have
    public ownerUuid?: string; // fk relation to supabase auth.user.id
    public uuid?: string;
    public createdDate?: Date;
    public name?: string;
    public gender?: 'M' | 'F';
    public stats?: {
        healthPoints?: NumberRange<0, 100>;
        hungerPoints?: NumberRange<0, 100>;
        thirstPoints?: NumberRange<0, 100>;
        cleanlinessPoints?: NumberRange<0, 100>;
        happinessPoints?: NumberRange<0, 100>;
    };
    // end of what the db will have

    constructor() { }

    // functions
    // consumeFood(): void {
    //     if (!this.isInitialized) { throw new Error("Denied, pet has to be initialized first") }
    //     this.logAction("consumedFood")
    // }

    logAction(actionMessage: string): void {
        console.log(`Pets Log: [${Date.now.toString()}] ${this.name} ${this.uuid} -> ${actionMessage} `);
    }
}
