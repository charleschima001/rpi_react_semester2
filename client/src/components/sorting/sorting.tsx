import { JSX, useState } from 'react';
import { SortOffersType } from '../../const';

type SortType = typeof SortOffersType[keyof typeof SortOffersType];

type SortingProps = {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function Sorting({ activeSort, onSortChange }: SortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span 
        className="places__sorting-type" 
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortOffersType).map((sortType) => (
            <li
              key={sortType}
              className={`places__option ${activeSort === sortType ? 'places__option--active' : ''}`}
              onClick={() => handleSortChange(sortType as SortType)}
              tabIndex={0}
            >
              {sortType}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export { Sorting };