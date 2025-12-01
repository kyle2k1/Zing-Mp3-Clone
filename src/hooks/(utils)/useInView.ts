import { RefObject, useEffect, useState } from 'react';

type Options = {
  root?: HTMLDivElement;
  rootMargin: string;
  threshold: number;
};

type Target = RefObject<Element>;

export const useInView = (target: Target, options: Options) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [observer, setObserver] = useState<IntersectionObserver>();
  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      setIsIntersecting(entries[0].isIntersecting);
    };
    observer?.disconnect();
    if (target.current) {
      const Observer = new IntersectionObserver(callback, options);
      Observer.observe(target.current);
      setObserver(Observer);
    }

    /* disconnect listening */
    return () => {
      observer?.disconnect();
    };
  }, [target.current, options.root, options.rootMargin, options.threshold]);
  return { isIntersecting };
};
