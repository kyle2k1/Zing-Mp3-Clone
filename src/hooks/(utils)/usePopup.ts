import { useRef } from 'react';

const usePopup = () => {
  let enterTimeout: any;
  let leaveTimeout: any;
  const timeoutDuration = 400;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = (open: boolean, close: () => void) => {
    if (enterTimeout) clearTimeout(enterTimeout);
    leaveTimeout = setTimeout(() => {
      if (!open) clearTimeout(leaveTimeout);
      close();
    }, timeoutDuration);
  };
  const onOpen = (open: boolean) => {
    if (leaveTimeout) clearTimeout(leaveTimeout);
    enterTimeout = setTimeout(() => {
      if (!open) {
        buttonRef?.current?.click();
      }
    }, timeoutDuration);
  };
  return { buttonRef, onClose, onOpen };
};

export default usePopup;
