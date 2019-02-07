# Weighted Rating

Usage

const parentSelector = '#rating-wrapper';
const options = {
  sliders: [
    { value: 30, name: 'rating-1' },
    { value: 25, name: 'rating-2' },
    { value: 25, name: 'rating-3' },
    { value: 20, name: 'rating-4' }
  ]
}

WRating.create({ parentSelector, options });