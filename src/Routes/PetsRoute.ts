import { Request, Response, Router } from 'express';
import CatService from '../Service/CatService';
import { tCustomResponse } from '../Types/tCustomResponse';

export const PetsRoute = Router();

PetsRoute.get('/test', (res: Response) => {
    let response: tCustomResponse;
    try {
        response = { succeed: true, data: {} };
    } catch (error) {
        response = { succeed: false, data: error };
    }
    res.send(response);
});

PetsRoute.post('/new-cat', (req: Request, res: Response) => {
    let response: tCustomResponse = { succeed: false };
    let allowedGenders = ['M', 'F'];
    // TODO: i don't think i need everything, redo or make validation better instead of this shit
    try {
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
        req.body.gender = (req.body.gender as string).toUpperCase();
        if (!allowedGenders.includes(req.body.gender)) {
            throw "value of key 'gender' must either be 'M' or 'F'";
        }
        let catService = new CatService();
        catService.createNewPet(
            req.body.owner_uuid,
            req.body.name,
            req.body.gender,
            req.body.breed
        );
        response.succeed = true;
    } catch (error) {
        response.error = error;
    } finally {
        res.type('json').send(response!);
    }
});
