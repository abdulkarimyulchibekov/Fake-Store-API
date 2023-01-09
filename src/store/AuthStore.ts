import create from 'zustand';
import { persist } from 'zustand/middleware';

const auth = (set: any) => ({
	token: '',
	setToken: (str: string) => set(() => ({ token: str })),
});

const authStore = persist(auth, { name: 'token' });
export const useAuthStore = create(authStore);

// export const useAuthStore = create(
// 	persist(
// 		(set) => ({
// 			token: '',
// 			setToken: (str: string) => set(() => ({ token: str })),
// 		}),
// 		{ name: 'token' },
// 	),
// );
