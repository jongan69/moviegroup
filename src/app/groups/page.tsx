import { NextPage } from "next";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import CreateGroupForm from "../../components/CreateGroupForm";

const Groups: NextPage = withPageAuthRequired(
  async () => {
    const session = await getSession();
    const user: any = session?.user;

    const groups = await fetch('/api/fetch-groups').then(res => res.json());
    console.log(groups);
    
    return (
      <div className="flex h-screen">
        {/* Sidebar with groups list */}
        <div className="w-80 bg-gray-100 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
            <CreateGroupForm />
          </div>
          
          {/* Groups list - you'll need to fetch and map through your groups */}
          <div className="space-y-2 p-4">
            {/* Placeholder groups - replace with actual data */}
            {groups.map((group: any, index: number) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer"
              >
                <h3 className="font-medium">{group.groupName}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Select a Group to Start Chatting</h1>
            <p className="text-gray-600">Choose a group from the sidebar or create a new one to begin.</p>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: "/groups" }
);

export default Groups;