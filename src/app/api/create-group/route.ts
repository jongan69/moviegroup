import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { getSession } from '@auth0/nextjs-auth0';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Ensure the user is authenticated
      const session = await getSession(req, res);
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { groupName, image } = req.body;

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