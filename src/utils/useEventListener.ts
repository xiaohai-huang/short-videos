import { RefObject, useEffect, useRef } from "react";

export default function useEventListener(
  ref: RefObject<HTMLElement>,
  eventName: string,
  callback: EventListener
) {
  const callbackRef = useRef<EventListener>(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = ref.current;
    const func = (e: Event) => {
      callbackRef?.current(e);
    };
    if (element) {
      element.addEventListener(eventName, func);
    }
    return () => {
      element?.removeEventListener(eventName, func);
    };
  }, [eventName, ref]);
}
