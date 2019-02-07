# Weighted Rating

## Getting Started

[Documentation](https://lacepek.github.io/weighted-rating/)

### Instalation

```
npm i weighted-rating
```

### Usage
```
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
```

## Versioning

For the versions available, see the [tags on this repository](https://github.com/lacepek/weighted-rating/tags). 

## Authors

* **Ladislav Čepek** - [lacepek](https://github.com/lacepek)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/lacepek/weighted-rating/blob/master/LICENSE) file for details
