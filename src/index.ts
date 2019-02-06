import Rating, { RatingOptions } from "./rating";

export const create = (config: { parentSelector: string, options: RatingOptions }) =>
{
  const rating = new Rating(config.options);

  const parentSelector = config.parentSelector;
  const parent = document.querySelector(parentSelector);
  if (parent) {
    parent.appendChild(rating.getElement());
  } else {
    console.error(`Element ${parentSelector} does not exist`);
  }
}
