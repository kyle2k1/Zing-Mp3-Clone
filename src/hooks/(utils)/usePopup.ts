import { useRef } from 'react';

const usePopup = () => {
  const timeoutDurationOpen = 100;
  const timeoutDurationLeave = 300;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onClose = (open: boolean, close: () => void) => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = undefined;
    }

    leaveTimeoutRef.current = setTimeout(() => {
      if (open) {
        close();
      }
      leaveTimeoutRef.current = undefined;
    }, timeoutDurationLeave);
  };

  const onOpen = (open: boolean) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = undefined;
    }

    enterTimeoutRef.current = setTimeout(() => {
      if (!open && buttonRef.current) {
        buttonRef.current.click();
      }
      enterTimeoutRef.current = undefined;
    }, timeoutDurationOpen);
  };

  return { buttonRef, onClose, onOpen };
};

export default usePopup;
