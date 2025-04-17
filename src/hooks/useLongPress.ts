import { useRef, useCallback } from "react";
import { hapticFeedback } from "@telegram-apps/sdk-react";

type LongPressOptions = {
  onLongPress: () => void;
  delay?: number;
  vibrate?: boolean;
};

export const useLongPress = ({ onLongPress, delay = 1500, vibrate = true }: LongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    alert("start");
    timerRef.current = setTimeout(() => {
      if (vibrate && hapticFeedback.isSupported()) {
        hapticFeedback.impactOccurred("medium");
      }
      onLongPress();
    }, delay);
  }, [onLongPress, delay, vibrate]);

  const clear = useCallback(() => {
    alert("clear");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchMove: clear,
    onTouchCancel: clear,
  };
};
