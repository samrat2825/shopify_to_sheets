import { useEffect } from 'react';
import '../styles/main.scss';

export default function Loader() {
  useEffect(() => {
    return () => window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loader">
      <div className="loaderLogoContainer">
        <img className="shed" src="/circle-logo-no-dots.webp" alt="logo" />
        <div className="dotContainer">
          <div className="dots">
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
          </div>
        </div>
      </div>
    </div>
  );
}
