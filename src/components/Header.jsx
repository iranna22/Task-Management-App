import React,{memo}from 'react';
import './Header.css'; 
const Header = memo( ({ text, bg, count }) => {
  return (
    <div className={`header-container ${bg}`}>
      {text}
      <div className="header-count">{count}</div>
    </div>
  );
});

export default Header;
