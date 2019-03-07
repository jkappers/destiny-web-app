import { useState } from 'react';

const MenuContext = ({ initialState = null, children }) => {
  const [anchorElement, setAnchorElement] = useState(initialState);
  
  return children(
    anchorElement,
    e => setAnchorElement(e.currentTarget),
    () => setAnchorElement(null)
  )
}

export default MenuContext;
