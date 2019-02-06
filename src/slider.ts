import { SliderOptions } from "./rating";

const defaultOptions = { value: 0, name: 'WRatingSlider', min: 0, max: 100 };

class Slider
{
  private element: HTMLElement;
  private input: HTMLInputElement;
  private isLocked: boolean;
  private value: number;
  private max: number;
  private min: number;

  constructor(options: Options = defaultOptions)
  {
    this.max = options.max;
    this.min = options.min;

    this.isLocked = false;

    this.element = document.createElement('div');
    this.element.className = 'col-11';

    this.input = this.renderInput();
    this.setValue(options.value);
  }

  public getElement(): HTMLElement
  {
    return this.element;
  }

  public setValue(value: number): void
  {
    const clamp = () => Math.max(this.min, Math.min(this.max, value));
    value = clamp();
    this.value = Math.round(value);
    this.input.value = value.toString();
    
    const fillIn = `linear-gradient(to right, #8B1713 0%, #8B1713 ${value}%, #bdc3c7 ${value}%)`;
    this.input.style.background = fillIn;
  }

  public getValue(): number
  {
    return this.value;
  }

  public setOnChange(onChange: onChange): void
  {
    this.input.addEventListener('input', event =>
    {
      const target = event.target as HTMLInputElement;
      const value = parseInt(target.value);
      this.setValue(value);

      onChange(this);
    });
  }

  public getIsLocked(): boolean
  {
    return this.isLocked;
  }

  public setIsLocked(isLocked: boolean): void
  {
    this.isLocked = isLocked;
  }

  private renderInput()
  {
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'WRating-slider';
    input.min = this.min.toString();
    input.max = this.max.toString();

    this.element.appendChild(input);

    return input;
  }
}

export interface Options extends SliderOptions
{
  min: number;
  max: number;
}

export type onChange = (slider: Slider) => void;

export default Slider;