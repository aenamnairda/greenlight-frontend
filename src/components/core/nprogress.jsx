'use client';

import * as React from 'react';
import nProgress from 'nprogress';

const delay = 120;

// This component is used to display the page navigation progress bar
export function NProgress() {
  const scheduledRef = React.useRef();

  React.useEffect(() => {
    nProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event) => {
      const targetUrl = event.currentTarget.href;
      const currentUrl = window.location.href;

      if (targetUrl !== currentUrl) {
        if (!scheduledRef.current) {
          // Do not start immediately, here is why:
          // https://fly.io/phoenix-files/make-your-liveview-feel-faster/
          scheduledRef.current = setTimeout(() => nProgress.start(), delay);
        }
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll('a[href]');

      anchorElements.forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick);
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

     
    window.history.pushState = new Proxy(window.history.pushState, {
      apply(target, thisArg, argArray) {
        clearTimeout(scheduledRef.current);
        nProgress.done();
         
        return target.apply(thisArg, argArray);
      },
    });
  });

  return null;
}
