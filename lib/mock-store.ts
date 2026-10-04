export type MockUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  passwordHash: string;
  bio?: string;
  avatarUrl?: string;
  profileImage?: string;
};

export const mockUsers: MockUser[] = [
  {
    id: 'demo-user',
    email: 'demo@vanta.app',
    username: 'demo-user',
    displayName: 'Demo User',
    passwordHash: '$2a$10$Qw0zFW5V0yQY2fwC3rZp0uMl6t7CzzM9e4FZQkWQqCoxcP2l8v3k2',
    bio: 'Product designer and live video enthusiast.',
  },
];

export const mockCalls: any[] = [];
export const mockAvatars: any[] = [
  {
    id: 'avatar-1',
    userId: 'demo-user',
    name: 'Professional',
    type: 'Business',
    style: 'Clean',
    skinTone: 'Warm',
    hairStyle: 'Short',
    clothing: 'Blazer',
    accessory: 'Glasses',
    background: 'Studio',
    colors: { primary: '#7c3aed', secondary: '#22d3ee' },
    config: {},
    isActive: true,
  },
  {
    id: 'avatar-2',
    userId: 'demo-user',
    name: 'Gaming',
    type: 'Streamer',
    style: 'Neon',
    skinTone: 'Cool',
    hairStyle: 'Side-swept',
    clothing: 'Hoodie',
    accessory: 'Headset',
    background: 'Arena',
    colors: { primary: '#a855f7', secondary: '#38bdf8' },
    config: {},
    isActive: false,
  },
];

export function findUserByEmail(email: string) {
  return mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserByUsername(username: string) {
  return mockUsers.find((user) => user.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export function createMockUser({ email, username, displayName, password }: { email: string; username: string; displayName: string; password: string }) {
  const bcrypt = require('bcryptjs');
  const user = {
    id: `user-${Date.now()}`,
    email,
    username,
    displayName,
    passwordHash: bcrypt.hashSync(password, 10),
    bio: 'New Vanta member.',
    avatarUrl: 'https://images.unsplash.com/...',
  };
  mockUsers.push(user);
  return user;
}

export function createMockCall(call: any) {
  mockCalls.push(call);
  return call;
}

export function listMockCalls() {
  return mockCalls;
}

export function createMockAvatar(avatar: any) {
  mockAvatars.push(avatar);
  return avatar;
}

export function listMockAvatars() {
  return mockAvatars;
}
