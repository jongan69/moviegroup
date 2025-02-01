import clientPromise from "@/utils/mongodb";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const { movieId, groupId } = await req.json();

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
