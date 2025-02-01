"use client"
import React, { useState } from 'react';

const CreateGroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [memberInput, setMemberInput] = useState('');

  const handleAddMember = () => {
    if (memberInput && !members.includes(memberInput)) {
      setMembers([...members, memberInput]);
      setMemberInput('');
    }
  };

  const handleRemoveMember = (memberToRemove: string) => {
    setMembers(members.filter(member => member !== memberToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName, members }),
      });

      if (response.ok) {
        alert('Group created successfully!');
        setGroupName('');
        setMembers([]);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter group name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="memberInput" className="block text-sm font-medium text-gray-700">
          Add Member
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            id="memberInput"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email address"
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>

      {members.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Members</h4>
          <div className="flex flex-wrap gap-2">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span>{member}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member)}
                  className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Group
      </button>
    </form>
  );
};

export default CreateGroupForm; 