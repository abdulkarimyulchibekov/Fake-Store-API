import { FieldValues } from 'react-hook-form';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { DataType } from '../types';

const account = (set: any) => ({
	name: '',
	roll: 'Admin',
	description: '',
	age: '',
	email: '',
	phone: '',

	setName: (name: string) => set(() => ({ name: name })),
	setRoll: (name: string) => set(() => ({ roll: name })),
	setDesc: (name: string) => set(() => ({ description: name })),
	setAge: (name: string) => set(() => ({ age: name })),
	setEmail: (name: string) => set(() => ({ email: name })),
	setPhone: (name: string) => set(() => ({ phone: name })),
	setAll: (obj: FieldValues) => set(() => ({ ...obj })),
});

const accountStore = persist(account, { name: 'account' });
export const useAccountStore = create(accountStore);
