import React from 'react'
import { getSession } from "@auth0/nextjs-auth0";
import Image from 'next/image';
async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  return user ? (
    <div className="flex items-center gap-4">
      <Image src={user.picture} alt={user.name} width={100} height={100} className="w-10 h-10 rounded-full" />
      <h2 className="text-lg font-semibold">{user.name}</h2>
    </div>
  ) : (
    <p>Not signed in</p>
  );
}

export default ProfileServer;
