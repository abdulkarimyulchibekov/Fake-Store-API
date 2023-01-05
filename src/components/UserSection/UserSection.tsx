import React from 'react';

interface IProps {
	userId: number;
}

export const UserSection = ({ userId }: IProps) => {
	return <div>{userId}</div>;
};
