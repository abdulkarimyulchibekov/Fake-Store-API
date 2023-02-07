export type ProductType = {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
};

export type UserType = {
	id: number;
	email: string;
	username: string;
	password: string;
	name: {
		firstname: string;
		lastname: string;
	};
	address: {
		city: string;
		street: string;
		number: number;
		zipcode: string;
		geolocation: {
			lat: string;
			long: string;
		};
	};
	phone: string;
};

export type CartProductType = {
	productId: number;
	quantity: number;
};

export type CartType = {
	id: number;
	userId: number;
	date: string;
	products: CartProductType[];
	__v: number;
	userName: string | undefined;
};

export type Types = ProductType | UserType | CartType | CartProductType;
