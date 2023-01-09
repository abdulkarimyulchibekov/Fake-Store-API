import create from 'zustand';

const get = (set: any) => ({
	data: [],
	loading: false,

	setData: (str: any[]) => set(() => ({ data: str })),
	setLoading: (loading: boolean) => set(() => ({ loading: loading })),
});

export const useGetStore = create(get);
