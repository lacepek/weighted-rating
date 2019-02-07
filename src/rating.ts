import Slider from "./slider";
import './styles/main.css';
import Lock from "./lock";
import IElement from "./iElement";
import Value from "./value";
import IRenderable from "./iRenderable";

const defaultOptions: RatingOptions = { sliders: null, minValue: 0, maxValue: 100 };

class Rating implements IElement, IRenderable
{
  private rating: HTMLElement;
  private maxValue: number;
  private minValue: number;
  private options: RatingOptions;

  constructor(options: RatingOptions)
  {
    options = { ...defaultOptions, ...options };

    if (!options.sliders) {
      console.error('You must set slider configuration');
      return;
    }

    this.minValue = options.minValue;
    this.maxValue = options.maxValue;

    this.options = options;

    this.render();
  }

  public getElement(): HTMLElement
  {
    return this.rating;
  }

  public render()
  {
    this.rating = document.createElement('div');
    this.rating.className = 'WRating-wrap';

    this.renderSliders(this.options);
  }

  private renderSliders(options: RatingOptions)
  {
    const locks = options.sliders.map(() => new Lock());
    const sliders: Slider[] = options.sliders.map((sliderOptions: SliderOptions) =>
    {
      const options = { ...sliderOptions, ...{ min: this.minValue, max: this.maxValue } };
      return new Slider(options);
    });

    sliders.forEach((slider, index) =>
    {
      const valueComponent = new Value(slider.getValue());

      slider.setValueComponent(valueComponent);
      slider.setOnChange(currentSlider => this.normalizeValues(sliders, currentSlider));

      const row = document.createElement('div');
      row.className = 'WRating-slider-wrap';

      const lock = locks[index];
      lock.addSlider(slider);

      row.appendChild(lock.getElement());
      row.appendChild(slider.getElement());
      row.appendChild(valueComponent.getElement());

      this.rating.appendChild(row);
    });
  }

  private normalizeValues(sliders: Slider[], currentSlider: Slider)
  {
    const calculateDifference = (sliders: Slider[]) =>
    {
      const values = sliders.map(slider => slider.getValue());
      return (values.reduce((sum, value) => sum + value)) - this.maxValue;
    }

    // filter out locked, curently moving sliders and sliders with min/maxed values
    const filterSliders = (sliders: Slider[], difference: number): Slider[] =>
    {
      const baseFilter = (slider: Slider) => !slider.getIsLocked() && slider !== currentSlider;
      const valueFilter = (slider: Slider) =>
      {
        if (difference > 0) {
          return slider.getValue() > this.minValue;
        } else if (difference < 0) {
          return slider.getValue() < this.maxValue;
        }
        return false;
      }

      return sliders.filter(slider => baseFilter(slider) && valueFilter(slider));
    }

    const setValues = (sliders: Slider[]) => 
    {
      const difference = calculateDifference(sliders);
      const filteredSliders = filterSliders(sliders, difference);
      if (filteredSliders && filteredSliders.length < 1) {
        return;
      }
      const ratio = 1 / filteredSliders.length;
      filteredSliders.forEach(slider =>
      {
        const substract = Math.floor(difference * ratio);
        let value = slider.getValue() - substract;
        slider.setValue(value);
      });
    }
    
    const restrictMaxValue = (sliders: Slider[]) =>
    {
      const values = sliders.map(slider => slider.getValue());
      const sum = values.reduce((sum, value) => sum + value);
      if (sum !== this.maxValue) {
        const difference = sum - this.maxValue;
        const filteredSliders = filterSliders(sliders, difference);
        const substract = difference / filterSliders.length;
        filteredSliders.forEach(slider => {
          const value = slider.getValue() - substract;
          slider.setValue(value);
        })
      }
    }

    setValues(sliders);

    restrictMaxValue(sliders);
  }
}

export type RatingOptions = {
  /**
   * Configuration for each slider
   */
  sliders: SliderOptions[];

  /**
   * Minimun value of sliders
   */
  minValue: number;

  /**
   * Maximum value of sliders
   */
  maxValue: number;
}

export type SliderOptions = {
  /**
   * Initital value
   */
  value: number;

  /**
   * Input name
   */
  name: string;
}

export default Rating;