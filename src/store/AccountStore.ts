import create from 'zustand';
import { persist } from 'zustand/middleware';

const account = (set: any) => ({
	name: '',
	roll: 'Admin',
	description: '',
	age: null,
	email: '',
	phone: '',

	setName: (name: string) => set(() => ({ name: name })),
	setRoll: (name: string) => set(() => ({ roll: name })),
	setDesc: (name: string) => set(() => ({ description: name })),
	setAge: (name: number) => set(() => ({ age: name })),
	setEmail: (name: string) => set(() => ({ email: name })),
	setPhone: (name: string) => set(() => ({ phone: name })),
});

const accountStore = persist(account, { name: 'account' });
export const useAccountStore = create(accountStore);
