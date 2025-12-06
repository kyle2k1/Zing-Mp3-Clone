import { useRef } from 'react';

const usePopup = () => {
  let enterTimeout: any;
  let leaveTimeout: any;
  const timeoutDurationOpen = 100;
  const timeoutDurationLeave = 300;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = (open: boolean, close: () => void) => {
    if (enterTimeout) clearTimeout(enterTimeout);
    leaveTimeout = setTimeout(() => {
      if (!open) clearTimeout(leaveTimeout);
      close();
    }, timeoutDurationLeave);
  };
  const onOpen = (open: boolean) => {
    if (leaveTimeout) clearTimeout(leaveTimeout);
    enterTimeout = setTimeout(() => {
      if (!open) {
        buttonRef?.current?.click();
      }
    }, timeoutDurationOpen);
  };
  return { buttonRef, onClose, onOpen };
};

export default usePopup;
