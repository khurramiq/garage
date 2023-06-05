import Vehicle from "@models/vehicle";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { 
        userId, 
        type,
        image,
        name,
        make,
        model,
        purchaseDate,
        startingODO,
        notes
    } = await request.json();

    try {
        await connectToDB();
        const newVehicle = new Vehicle({ 
            creator: userId, 
            type,
            image,
            name,
            make,
            model,
            purchaseDate,
            startingODO,
            notes 
        });

        await newVehicle.save();
        return new Response(JSON.stringify(newVehicle), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new vehicle", { status: 500 });
    }
}
