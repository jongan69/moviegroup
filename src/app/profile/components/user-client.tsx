"use client";
import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";

function ProfileClient() {
  const { user, error, isLoading } = useUser();

  const renderLoading = () => <div>Loading...</div>;
  const renderError = (errorMessage: string) => <div>{errorMessage}</div>;
  const renderUserProfile = (user: any) => (
    <div>
      <img src={user?.picture || ''} alt={user?.name || ''} />
      <h2>{user?.name}</h2>
    </div>
  );

  if (isLoading) return renderLoading();
  if (error) return renderError(error.message);
  return user ? renderUserProfile(user) : <p>Not signed in</p>;
}

export default ProfileClient;
