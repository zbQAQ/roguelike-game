type SetterType<T> = (valOrUpdater: T | ((currVal: T) => T)) => void;

function recoilMergeSetter<T = any>(setter: SetterType<T>, value: Partial<T>) {
  setter((pre) => ({ ...pre, ...value }));
}

export default recoilMergeSetter;
