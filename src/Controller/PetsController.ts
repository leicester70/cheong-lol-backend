import { Request, Response, Router } from 'express';
import CatService from '../Service/CatService';
import { tCustomResponse } from '../Types/tCustomResponse';
import { AvailableCatBreeds } from '../Models/Cat';

export const PetsController = Router();

PetsController.get('/test', (res: Response) => {
    let response: tCustomResponse;
    try {
        response = { succeed: true, data: {} };
    } catch (error) {
        response = { succeed: false, data: error };
    }
    res.send(response);
});

PetsController.post('/new-cat', async (req: Request, res: Response) => {
    let response: tCustomResponse = { succeed: false };
    let allowedGenders = ['M', 'F'];
    // TODO: i don't think i need everything, redo or make validation better instead of this shit
    try {
        if (!req.body.owner_uuid) {
            throw "value of key 'owner_uuid' is undefined";
        }
        // validation request body
        if (!req.body.name) {
            throw "value of key 'name' is undefined";
        }
        if (
            req.body.name.replace(' ', '').length > 25 ||
            req.body.name.replace(' ', '').length < 3
        ) {
            throw "value of key 'name' must be more than 3 characters and cannot exceed 25 characters";
        }
        if (req.body.gender == null) {
            throw `req.body.gender == ${req.body.gender}, please specify a gender.`;
        }
        req.body.gender = (req.body.gender as string).toUpperCase();
        if (!allowedGenders.includes(req.body.gender)) {
            throw "value of key 'gender' must either be 'M' or 'F'";
        }
        if (!req.body.breed) {
            let availCatBreedString: string = "";
            Object.values(
                AvailableCatBreeds
            ).forEach((validBreed: string) => {
                availCatBreedString += `${validBreed}, `;
            })
            throw `cat breed was not specified. req.body.breed should be one the following, [${availCatBreedString!}]`;
        }
        if (!Object.values(AvailableCatBreeds).includes(req.body.breed)) {
            throw `Invalid Cat Breed - ${Object.values(AvailableCatBreeds)} does not include: ${req.body.breed}`;
        }
        try {
            let catService = new CatService();
            await catService.createNewPet(
                req.body.owner_uuid,
                req.body.name,
                req.body.gender,
                req.body.breed
            );
            response.succeed = true;
        } catch (error) {
            throw error;
        }
    } catch (error) {
        response.error = error;
    } finally {
        res.type('json').send(response!);
    }
});
