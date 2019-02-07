export default interface ILockable
{
  getIsLocked(): boolean;
  setIsLocked(isLocked: boolean): void;
}