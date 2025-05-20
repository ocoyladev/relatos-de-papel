import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="rating flex items-center">
      <div className="rating__stars flex">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          const isHalfFilled = !isFilled && starValue <= rating + 0.5;
          
          return (
            <span 
              key={index} 
              className={`rating__star ${
                isFilled 
                  ? 'text-secondary' 
                  : isHalfFilled 
                  ? 'text-secondary' 
                  : 'text-gray-300'
              }`}
            >
              <Star size={16} fill={isFilled || isHalfFilled ? "currentColor" : "none"} />
            </span>
          );
        })}
      </div>
      <span className="rating__value ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;