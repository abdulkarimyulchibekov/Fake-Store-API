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

export const Regex =
	// eslint-disable-next-line no-control-regex
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
