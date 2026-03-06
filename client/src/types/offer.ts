export type OfferLocation = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type CityOffer = {
    name: string;
    location: OfferLocation;
}

export type HostOffer = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityOffer;
    location: OfferLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
    description?: string;
    bedrooms?: number;
    goods?: string[];
    host?: HostOffer;
    images?: string[];
    maxAdults?: number;
    features?: string[];
    rooms?: number;
    guests?: number;
    photos?: string[];
    author?: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
};

export type OffersList = Offer[];