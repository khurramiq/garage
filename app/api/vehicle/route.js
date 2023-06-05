import Vehicle from "@models/vehicle";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const vehicles = await Vehicle.find({}).populate('creator')

        return new Response(JSON.stringify(vehicles), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all vehicles", { status: 500 })
    }
} 