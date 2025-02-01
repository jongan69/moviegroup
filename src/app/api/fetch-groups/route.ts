import clientPromise from '../../../utils/mongodb';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
  const session = await getSession();
  if (!session || !session.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('movie-group');
  const groups = await db.collection('groups').find({ members: { $in: [session.user.email] } }).toArray();
  console.log(groups);
  if (!groups) {
    return Response.json({ groups: [] });
  }
  return Response.json(groups);
}