import { useState } from 'react';

const DialogContext = ({ initialState = false, children }) => {
  const [isOpen, setIsOpen] = useState(initialState);
  
  return children(
    isOpen,
    () => setIsOpen(true),
    () => setIsOpen(false)
  )
}

export default DialogContext;
