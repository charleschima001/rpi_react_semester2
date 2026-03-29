import { describe, it, expect } from 'vitest';
import { sortOffers } from '../utils/sort';
import { makeFakeOffer } from './mocks';

describe('sortOffers', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];
    const result = sortOffers([...offers], 'PriceToHigh');

    expect(result[0].price).toBe(100);
    expect(result[1].price).toBe(200);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 200 },
    ];
    const result = sortOffers([...offers], 'PriceToLow');

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(200);
    expect(result[2].price).toBe(100);
  });

  it('сортирует по рейтингу (TopRated)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];
    const result = sortOffers([...offers], 'TopRated');

    expect(result[0].rating).toBe(5);
    expect(result[1].rating).toBe(4);
    expect(result[2].rating).toBe(3);
  });

  it('сохраняет порядок для Popular', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300, title: 'A' },
      { ...makeFakeOffer(), price: 100, title: 'B' },
      { ...makeFakeOffer(), price: 200, title: 'C' },
    ];
    const result = sortOffers([...offers], 'Popular');

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(100);
    expect(result[2].price).toBe(200);
  });

  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];
    const copy = [...offers];
    const result = sortOffers(offers, 'PriceToHigh');
    
    expect(result).not.toBe(offers); 
    expect(offers).toEqual(copy);  
  });

  it('корректно работает при пустом массиве', () => {
    expect(sortOffers([], 'Popular')).toEqual([]);
    expect(sortOffers([], 'PriceToHigh')).toEqual([]);
    expect(sortOffers([], 'PriceToLow')).toEqual([]);
    expect(sortOffers([], 'TopRated')).toEqual([]);
  });
});