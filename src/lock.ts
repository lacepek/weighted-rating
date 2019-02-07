import Slider from "./slider";
import IElement from "./iElement";
import ILockable from "./iLockable";
import IRenderable from "./iRenderable";

class Lock implements IElement, ILockable, IRenderable
{
  private lock: HTMLElement;
  private icon: HTMLElement;
  private isLocked: boolean;
  private onLock: () => void;
  private slider: Slider;
  private isHidden: boolean;

  constructor(isLocked = false)
  {
    this.isLocked = isLocked;

    this.render();

    this.lock.addEventListener('click', () => { this.onClick() });
  }

  public render(): void
  {
    this.lock = document.createElement('div');
    this.lock.className = 'WRating-lock';

    this.icon = document.createElement('span');
    this.setIcon();

    this.lock.appendChild(this.icon);

    this.show();
  }

  public getElement(): HTMLElement
  {
    return this.lock;
  }

  public getIsLocked(): boolean
  {
    return this.isLocked;
  }

  public setIsLocked(isLocked: boolean): void
  {
    this.isLocked = isLocked;
  }

  public show()
  {
    this.icon.hidden = false;
    this.icon.style.display = 'block';
    this.isHidden = false;
  }

  public hide()
  {
    this.icon.hidden = true;
    this.icon.style.display = 'none';
    this.isHidden = true;
  }

  public setOnLock(onLock: () => void)
  {
    this.onLock = onLock;
  }

  public addSlider(slider: Slider)
  {
    this.slider = slider;
  }

  private toggle()
  {
    this.isLocked = !this.isLocked;
    this.slider.setIsLocked(this.isLocked);
    this.setIcon();
  }

  private setIcon()
  {
    const className = 'WRating-icon fa fa-lock fa-2x';
    this.icon.className = this.isLocked ? `${className} WRating-active` : className;
  }

  private onClick()
  {
    if (!this.isHidden) {
      this.toggle();
      if (this.onLock) {
        this.onLock();
      }
    }
  }
}

export default Lock;