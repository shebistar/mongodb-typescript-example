// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Vendor from "../models/vendor";

// Global Config

export const vendorsRouter = express.Router();

vendorsRouter.use(express.json());

// GET

vendorsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        //const vendors = (await collections.vendors.find({}).toArray()) as Vendor[];
        //const vendors = (await collections.vendors.find({}).toArray()) as unknown as Vendor[];
        const vendors = (await collections.vendors.find({}).toArray()) as unknown as Vendor[];

        
        res.status(200).send(vendors);
    } catch (error) {
        res.status(500).send(error.message);
    }

    
    
}
)

vendorsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id)};
        const vendor = (await collections.vendors.findOne(query)) as unknown as Vendor;
        
        if (vendor) {
            res.status(200).send(vendor);
        }
    

    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id
        }`);
    }
}


);


// POST

vendorsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newVendor = req.body as Vendor;
        const result = await collections.vendors.insertOne(newVendor);
//Use InsertMany to insert multiple documents at once
        result
            ? res.status(201).send(`Successfully created a new vendor with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");


    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);

    }
});

// PUT

vendorsRouter.put(":id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedVendor: Vendor = req.body as Vendor;
        const query = { _id: new ObjectId(id) };

        const result = await collections.vendors.updateOne(query, { $set: updatedVendor});

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }   

});

// DELETE

vendorsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id)};
        const result = await collections.vendors.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfull removed vendor with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove vendor with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }


    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});