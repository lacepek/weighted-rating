import Slider from "./slider";

class Lock
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

    this.lock = document.createElement('div');
    this.lock.className = 'col-1';

    this.icon = document.createElement('span');
    this.setIcon();

    this.lock.appendChild(this.icon);

    this.show();

    this.lock.addEventListener('click', () => { this.onClick() });
  }

  public getElement(): HTMLElement
  {
    return this.lock;
  }

  public getIsLocked(): boolean
  {
    return this.isLocked;
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
    const className = 'fa';
    this.icon.className = this.isLocked ? `${className} fa-lock` : `${className} fa-lock-open`;
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