export interface CakeProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    basePrice: number;
    rating: number;
    image: string;
    features: string[];
}

export const cakeProducts: CakeProduct[] = [
    {
        id: 'classic-tiramisu',
        name: 'Classic Italian Tiramisu',
        description: 'Made using traditional craftsmanship with espresso-soaked layers, rich mascarpone cream, and premium cocoa dusting.',
        price: '$8.50',
        basePrice: 8.50,
        rating: 4.9,
        image: '/cake/tiramisu-classic.jpg',
        features: ['Authentic Recipe', 'Premium Mascarpone', 'Cocoa Dusting']
    },
    {
        id: 'chocolate-tiramisu',
        name: 'Chocolate Tiramisu',
        description: 'A decadent twist on the classic, featuring layers of chocolate sponge, chocolate mascarpone, and chocolate shavings.',
        price: '$9.00',
        basePrice: 9.00,
        rating: 4.8,
        image: '/cake/tiramisu-chocolate.jpg',
        features: ['Rich Chocolate', 'Decadent Layers', 'Chocolate Curls']
    },
    {
        id: 'strawberry-tiramisu',
        name: 'Strawberry Tiramisu',
        description: 'A refreshing, fruity take on tiramisu layered with fresh strawberries, strawberry puree, and sweet cream.',
        price: '$9.50',
        basePrice: 9.50,
        rating: 4.7,
        image: '/cake/tiramisu-strawberry.jpg',
        features: ['Fresh Strawberries', 'Fruity Layers', 'Sweet Cream']
    }
];

export interface FeatureHighlight {
    title: string;
    description: string;
    position: 'left' | 'right';
}

export const features: FeatureHighlight[] = [
    {
        title: 'Authentic Italian Recipe',
        description: 'Made using traditional tiramisu craftsmanship passed down through generations.',
        position: 'left'
    },
    {
        title: 'Fresh Ingredients Daily',
        description: 'Premium mascarpone, ethically sourced cocoa, and freshly brewed espresso for perfection.',
        position: 'right'
    },
    {
        title: 'Handcrafted Excellence',
        description: 'Prepared carefully by expert pastry chefs who understand the delicate balance of flavors.',
        position: 'left'
    },
    {
        title: 'Luxury Dessert Experience',
        description: 'Crafted for an unforgettable taste experience that elevates your everyday moments.',
        position: 'right'
    }
];
