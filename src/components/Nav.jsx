import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/main.scss';

const Nav = () => {
  const [displayed, setIfDisplayed] = useState(false);
  const dropdownRef = useRef();
  const profile = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profile.current && profile.current.contains(event.target)) {
        setIfDisplayed(!displayed);
      }
      if (
        displayed &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIfDisplayed(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [displayed]);

  return (
    <div className='main'>
      <div className='first' style={{ margin: '0', padding: '0' }}>
        <img
          className='logo'
          src={'/header_logo.webp'}
          alt='amigo logo'
          style={{ height: 80, width: 200 }}
        />
      </div>

      <div className='third'>
        <div
          ref={profile}
          style={{ backgroundImage: "url('/account.png')" }}
          className={`${displayed && 'active-profile'} profile`}
        />
      </div>
    </div>
  );
};

export default Nav;
