import create from 'zustand';
import { persist } from 'zustand/middleware';

const account = (set: any) => ({
	name: 'Abdulkarim',
	roll: 'Admin',
	description: 'I am a good boy',
	age: 15,
	setName: (name: string) => set(() => ({ name: name })),
	setRoll: (name: string) => set(() => ({ roll: name })),
	setDesc: (name: string) => set(() => ({ description: name })),
	setAge: (name: number) => set(() => ({ age: name })),
});

const accountStore = persist(account, { name: 'account' });
export const useAccountStore = create(accountStore);
