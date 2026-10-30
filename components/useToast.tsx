"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 2600) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const show = useCallback(
    (text: string) => {
      setMessage(text);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), duration);
    },
    [duration]
  );

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const toast = message ? (
    <div className="toast" role="status">
      {message}
    </div>
  ) : null;

  return { show, toast };
}
