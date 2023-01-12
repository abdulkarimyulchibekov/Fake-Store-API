import { Link } from 'react-router-dom';
import { Item } from './CartItem.styles';

interface IProps {
	time: string;
	id: number;
}

export const CartItem = ({ time, id }: IProps) => {
	return (
		<Item>
			<Link className='item__link' to={`${id}`}>
				{time.split('T')[0]}
			</Link>
		</Item>
	);
};
