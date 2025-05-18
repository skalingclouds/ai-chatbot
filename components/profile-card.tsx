'use client';

import Image from 'next/image';

interface UserProfile {
  name: string;
  profileImage: string;
  recentCuts?: Array<string>;
}

export function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={user.profileImage}
        alt={`${user.name} profile`}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="font-medium">{user.name}</div>
      {user.recentCuts && user.recentCuts.length > 0 && (
        <div className="flex gap-2">
          {user.recentCuts.map((url) => (
            <Image
              key={url}
              src={url}
              alt="Recent cut"
              width={60}
              height={60}
              className="rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
