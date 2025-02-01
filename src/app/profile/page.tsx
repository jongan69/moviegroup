import { getSession } from "@auth0/nextjs-auth0";
import ProfileClient from "./components/user-client";
import ProfileServer from "./components/user-server";
import { redirect } from "next/navigation";
import styles from './Profile.module.css'; // Import a CSS module for custom styles

const Profile = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${styles.background}`}>
      <header className="w-full py-4 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </header>
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <div className={`p-6 bg-white shadow-lg rounded-lg ${styles.card} mb-4`}>
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Server Component</h1>
          <ProfileServer />
        </div>
        {user && (
          <div className={`p-6 bg-white shadow-lg rounded-lg ${styles.card} mb-4`}>
            <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        )}
      </div>
      <footer className="w-full py-4 bg-gray-800 text-white text-center mt-8">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;