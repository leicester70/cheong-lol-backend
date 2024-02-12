import { Router, Request, Response } from 'express';
import { iCustomResponse } from '../../Interfaces/iCustomResponse';
import { CatController } from '../../Classes/Pets/Subclass/oldCat';

export const PetsRoute = Router();

PetsRoute.get('/test', (req: Request, res: Response) => {
    let response: CustomResponse;
    try {
        response = { succeed: true, data: {} };
    } catch (error) {
        response = { succeed: false, data: error };
    }
    res.send(response);
});

PetsRoute.post('/new-cat', (req: Request, res: Response) => {
    let response: CustomResponse = { succeed: false };
    let allowedGenders = ['M', 'F'];
    try {
        // validation request body
        if (!req.body.name) {
            throw "value of key 'name' is undefined";
        }
        if (req.body.name.replace(' ', '').length > 25 || req.body.name.replace(' ', '').length < 3) {
            throw "value of key 'name' must be more than 3 characters and cannot exceed 25 characters";
        }
        req.body.gender = (req.body.gender as string).toUpperCase();
        if (!allowedGenders.includes(req.body.gender)) {
            throw "value of key 'gender' must either be 'M' or 'F'";
        }
        let catCtrlr = new CatController();
        if (!catCtrlr.possibleBreedsArr.includes(req.body.breed)) {
            throw `${catCtrlr.possibleBreedsArr} does not include -> ${req.body.breed}`;
        }
        catCtrlr.createNewCat(req.body.name, req.body.gender, req.body.breed);
        response.succeed = true;
    } catch (error) {
        response.error = error;
    } finally {
        res.type('json').send(response!);
    }
});
