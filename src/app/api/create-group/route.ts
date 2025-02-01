import { NextRequest } from 'next/server';
import clientPromise from '../../../utils/mongodb';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req: NextRequest) {
    try {
      // Ensure the user is authenticated
      const session = await getSession();
      if (!session || !session.user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { groupName } = await req.json();

      const client = await clientPromise;
      const db = client.db('movie-group');

      // Insert the new group into the database
      const result = await db.collection('groups').insertOne({ groupName });

      return Response.json({ message: 'Group created successfully', groupId: result.insertedId });
    } catch (error) {
      console.error('Error creating group:', error);
      return Response.json({ error: 'Failed to create group' });
    }
} 