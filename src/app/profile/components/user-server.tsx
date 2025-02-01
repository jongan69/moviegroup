import React from 'react'
import { getSession } from "@auth0/nextjs-auth0";

async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  return user ? (
    <div className="flex items-center gap-4">
      <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
      <h2 className="text-lg font-semibold">{user.name}</h2>
    </div>
  ) : (
    <p>Not signed in</p>
  );
}

export default ProfileServer;
