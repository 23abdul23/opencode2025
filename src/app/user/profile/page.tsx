'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export interface PullRequest {
  prNumber: number;
  status: string;
  title: string;
  issue: {
    issueNumber: number;
    currentPoints: number;
    repoName: string;
  };
}

export interface ProfileData {
  name: string;
  email: string;
  college: string;
  avatarUrl: string;
  githubId: string;
  discordId: string;
  PR: PullRequest[];
  prMerged: number;
  points: number;
  rank: number;
}

export default function ProfileSelf() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    const githubID = user?.githubId;

    if (!githubID) {
      redirect('/auth/sign-in');
      return;
    }

    // Example: Fetch profile data here
    // fetch(`/api/profile/${githubID}`)
    //   .then(res => res.json())
    //   .then(setProfile);

    // For demo, set dummy data
    setProfile({
      name: 'John Doe',
      email: 'john@example.com',
      college: 'Example University',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      githubId: githubID,
      discordId: 'JohnDoe#1234',
      PR: [],
      prMerged: 10,
      points: 150,
      rank: 5,
    });
  }, []);

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow mt-6">
      <div className="flex flex-col items-center">
        <img
          src={profile.avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-gray-500">{profile.email}</p>
        <p className="text-gray-500">{profile.college}</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold">{profile.prMerged}</div>
          <div className="text-gray-500 text-sm">PRs Merged</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{profile.points}</div>
          <div className="text-gray-500 text-sm">Points</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{profile.rank}</div>
          <div className="text-gray-500 text-sm">Rank</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{profile.githubId}</div>
          <div className="text-gray-500 text-sm">GitHub ID</div>
        </div>
      </div>
    </div>
  );
}
