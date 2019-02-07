import IElement from "./iElement";
import IRenderable from "./iRenderable";

export default class Value implements IElement, IRenderable
{
  private element: HTMLElement;

  constructor(value: number)
  {
    this.render();

    this.setValue(value);
  }

  public render(): void
  {
    this.element = document.createElement('div');
    this.element.className = 'WRating-value';
  }

  public getElement(): HTMLElement
  {
    return this.element;
  }

  public setValue(value: number): void
  {
    value = Math.round(value);
    this.element.innerHTML = value.toString();
  }
}