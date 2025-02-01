"use client";
import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
function ProfileClient() {
  const { user, error, isLoading } = useUser();

  const renderLoading = () => <div>Loading...</div>;
  const renderError = (errorMessage: string) => <div>{errorMessage}</div>;

  // Adjust the UserProfile type to match the Auth0 type
  type UserProfile = {
    picture?: string | null;
    name?: string | null;
  };

  const renderUserProfile = (user: UserProfile) => (
    <div>
      <Image src={user?.picture || ''} alt={user?.name || ''} width={100} height={100} />
      <h2>{user?.name}</h2>
    </div>
  );

  if (isLoading) return renderLoading();
  if (error) return renderError(error.message);
  return user ? renderUserProfile(user) : <p>Not signed in</p>;
}

export default ProfileClient;
