import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null as unknown as { username: string | null; email: string | null },
});
