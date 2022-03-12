import '../styles/main.scss';

const Header = () => {
  return (
    <>
      <div className='header'>
        <nav className='navbar'>
          <img
            className='logo'
            src='/header_logo.webp'
            alt='amigo logo'
            style={{ height: 100, width: 200 }}
          />
        </nav>
      </div>
    </>
  );
};

export default Header;
