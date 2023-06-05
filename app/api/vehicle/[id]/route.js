import Vehicle from "@models/vehicle";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const vehicle = await Vehicle.findById(params.id).populate("creator")
        if (!vehicle) return new Response("Vehicle Not Found", { status: 404 });

        return new Response(JSON.stringify(vehicle), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { 
        type,
        image,
        name,
        make,
        model,
        purchaseDate,
        startingODO,
        notes
     } = await request.json();

     console.log("type", type)
     console.log("image", image)
     console.log("name", name)
     console.log("make", make)
     console.log("model", model)
     console.log("purchaseDate", purchaseDate)
     console.log("startingODO", startingODO)
     console.log("notes", notes)

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingVehicle = await Vehicle.findById(params.id);

        if (!existingVehicle) {
            return new Response("Vehicle not found", { status: 404 });
        }

        // Update the Vehicle with new data        
        existingVehicle.type = type;
        existingVehicle.image = image;
        existingVehicle.name = name;
        existingVehicle.make = make;
        existingVehicle.model = model;
        existingVehicle.purchaseDate = purchaseDate;
        existingVehicle.startingODO = startingODO;
        existingVehicle.notes = notes;

        console.log("existingVehicle", existingVehicle)

        await existingVehicle.save();        

        return new Response("Successfully updated the vehicles", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Vehicle", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Vehicle.findByIdAndRemove(params.id);

        return new Response("Vehicle deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
