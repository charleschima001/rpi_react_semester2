import { JSX } from 'react';
import { useAppDispatch } from '../../hooks';  // Removed useAppSelector
import { changeCity } from '../../store/action';
import { CITIES_LOCATION } from '../../const';

type CitiesListProps = {
  selectedCity: string;
};

function CitiesList({ selectedCity }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES_LOCATION.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city.name === selectedCity ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(changeCity(city.name));
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { CitiesList };