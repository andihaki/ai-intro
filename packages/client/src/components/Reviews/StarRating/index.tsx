import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
  value: number;
}

const StarRating = ({ value }: Props) => {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {placeholders.map((item) =>
        item <= value ? <FaStar key={item} /> : <FaRegStar key={item} />
      )}
    </div>
  );
};

export default StarRating;
