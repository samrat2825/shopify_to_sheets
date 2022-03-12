import { useState, useEffect } from 'react';
import { getConfig } from '../helper/firebaseMethods/index';

function FetchData(props) {
  const [apikey, setApikey] = useState('');
  const [shop, setShop] = useState('');
  const [request_timeout, setTimeout] = useState('300');
  const [error, setError] = useState('');

  useEffect(() => {
    getConfig()
      .then((res) => {
        if (res.config.apikey == '' || res.config.shop == '') {
          setError('Please Add Store Details');
        }

        setApikey(res.config.apikey);
        setShop(res.config.shop);
        setTimeout(res.config.timeout);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      {error.length !== 0 ? error : ''}
    </div>
  );
}

export default FetchData;
