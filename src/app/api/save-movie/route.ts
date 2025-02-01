import clientPromise from "@/utils/mongodb";
import { NextApiRequest } from "next";
import { ObjectId } from "mongodb";

export async function POST(req: NextApiRequest) {
    const { movieId, groupId } = req.body;

    const client = await clientPromise;
    const db = client.db('movie-group');

    if (!groupId) {
        return Response.json({ error: 'Group ID is required' });
    }

    const result = await db.collection('groups').updateOne(
        { _id: ObjectId.createFromTime(groupId) },
        { $push: { savedMovies: movieId } }
    );

    return Response.json({ message: 'Movie saved successfully', result });
}
