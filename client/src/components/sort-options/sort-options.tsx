import { SortOffersType } from '../../const';
import { useState, KeyboardEvent } from 'react';
import { SortOffer } from '../../types/sort';

type SortOptionsProps = {
  activeSort: SortOffer;
  onChange: (newSort: SortOffer) => void;
};

function SortOptions({ activeSort, onChange }: SortOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  };

  const handleTypeClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSortItemClick = (type: SortOffer) => {
    onChange(type);
    setIsOpen(false);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleKeyDown}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {SortOffersType[activeSort]}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
      >
        {(Object.keys(SortOffersType) as SortOffer[]).map((key) => (
          <li
            key={key}
            className={`places__option ${key === activeSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortItemClick(key)}
          >
            {SortOffersType[key]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { SortOptions };