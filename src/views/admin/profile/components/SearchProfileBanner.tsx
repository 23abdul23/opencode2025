'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchProfileBanner() {
  const [githubID, setGithubID] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubID.trim()) {
      setError('Please enter a GitHub ID');
      return;
    }

    setError('');
    router.push(`/user/profile/${githubID}`);
  };

  return (
    <div className="w-full bg-gradient-to-r py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#755FFF] mb-6 text-center">
          Search User Profile
        </h1>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter GitHub ID..."
              value={githubID}
              onChange={(e) => {
                setGithubID(e.target.value);
                setError('');
              }}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#755FFF] text-white font-semibold rounded-lg hover:bg-white-100 transition-colors duration-200 cursor-pointer"
            >
              Search
            </button>
          </div>
          
          {error && (
            <p className="text-red-200 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
