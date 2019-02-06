import Slider from "./slider";
import './styles/main.css';
import Lock from "./lock";

const defaultOptions: RatingOptions = { sliders: [], minValue: 0, maxValue: 100 };

class Rating
{
  private rating: HTMLElement;
  private maxValue: number;
  private minValue: number;

  constructor(options: RatingOptions)
  {
    options = { ...defaultOptions, ...options };

    this.minValue = options.minValue;
    this.maxValue = options.maxValue;

    this.render(options);
  }

  public getElement(): HTMLElement
  {
    return this.rating;
  }

  private render(options: RatingOptions)
  {
    this.rating = document.createElement('div');

    this.renderSliders(options);
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
      const row = document.createElement('div');
      row.className = 'row';

      const lock = locks[index];
      lock.addSlider(slider);

      row.appendChild(lock.getElement());

      slider.setOnChange(currentSlider => this.normalizeValues(sliders, currentSlider));

      row.appendChild(slider.getElement());

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
      filteredSliders.forEach(slider =>
      {
        const ratio = 1 / filteredSliders.length;
        const substract = Math.floor(difference * ratio * this.maxValue) / this.maxValue;
        let value = slider.getValue() - substract;
        slider.setValue(value);
      });
    }

    const restrictMaxValue = (sliders: Slider[]) =>
    {
      const values = sliders.map(slider => slider.getValue());
      const sum = values.reduce((sum, value) => sum + value);
      if (sum !== this.maxValue) {
        const value = currentSlider.getValue() + (this.maxValue - sum);
        currentSlider.setValue(value);
      }
    }

    setValues(sliders);

    restrictMaxValue(sliders);
  }
}

export type RatingOptions = { sliders: SliderOptions[]; minValue: number; maxValue: number; }

export type SliderOptions = { value: number; name: string; }

export default Rating;