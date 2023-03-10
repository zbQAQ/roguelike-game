import { useEventListener } from 'usehooks-ts';
import AllCustomEventKey from '@/constant/customEventKey';
import { useCallback } from 'react';

type AllCustomEventKeyType = typeof AllCustomEventKey;
type AllCustomEventValueType = ValueOf<AllCustomEventKeyType>;

export const useCustomEventListener = (
  eventKey: AllCustomEventValueType | AllCustomEventValueType[],
  handler: (e: any) => void
) => {
  useEventListener(eventKey as keyof WindowEventMap, handler);
  return null;
};

export const useCustomEventTrigger = () => {
  const trigger = useCallback(
    (eventKey: AllCustomEventValueType, detail?: any) => {
      const event = new CustomEvent(eventKey, { detail });
      window.dispatchEvent(event);
    },
    []
  );

  return trigger;
};
