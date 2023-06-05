import Vehicle from "@models/vehicle";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const vehicles = await Vehicle.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(vehicles), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch vehicles created by user", { status: 500 })
    }
} 