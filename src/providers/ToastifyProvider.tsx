'use client';

import { ToastContainer, Zoom } from 'react-toastify';

const ToastifyProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      closeOnClick
      theme="light"
      transition={Zoom}
      draggable={false}
      limit={2}
      pauseOnFocusLoss={false}
      style={{ fontSize: '14px' }}
    />
  );
};

export default ToastifyProvider;
