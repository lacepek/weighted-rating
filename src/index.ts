import Rating, { RatingOptions } from "./rating";

export const create = (config: Config) =>
{
  if (!config.options) {
    console.error(`Options must be set`);
    return;
  }

  const rating = new Rating(config.options);

  const parentSelector = config.parentSelector;
  const parent = document.querySelector(parentSelector);
  if (!parent) {
    console.error(`Element ${parentSelector} does not exist`);
    return;
  }
  parent.appendChild(rating.getElement());
}

export type Config = {
  /**
   * Selector for element to attach slider to
   */
  parentSelector: string;

  /**
   * Rating options
   */
  options: RatingOptions;
}
