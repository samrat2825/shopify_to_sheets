import { useState, useEffect } from 'react';
import { updateConfig } from '../redux/Actions/actions';
import { store } from '../redux/Store/store';
import { setConfig, getConfig } from '../helper/firebaseMethods/index';

function Settings(props) {
  const currentState = store.getState();
  const [refreshes, setRefreshes] = useState('1');
  const [apikey, setApikey] = useState('');
  const [shop, setShop] = useState('');
  const [request_timeout, setTimeout] = useState('300');

  const handleRefreshChange = (e) => {
    if (Number(e.target.value) <= 0 || Number(e.target.value) > 24) {
      setRefreshes('1');
    } else {
      setRefreshes(e.target.value);
    }
  };

  const updateSettings = () => {
    props.openUserSettings(false);
    let newConfig = {};
    newConfig['refreshes'] = refreshes;
    newConfig['apikey'] = apikey;
    newConfig['shop'] = shop;
    newConfig['timeout'] = request_timeout;
    updateConfig(newConfig);
    setConfig(newConfig);
  };

  useEffect(() => {
    getConfig()
      .then((res) => {
        setRefreshes(res.config.refreshes);
        setApikey(res.config.apikey);
        setShop(res.config.shop);
        setTimeout(res.config.timeout);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'lightcyan',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexdirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginRight: '25px' }}>Refresh Time (in hours)</div>
        <input
          type='text'
          onInput={handleRefreshChange}
          value={refreshes}
          style={{ maxWidth: '50px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexdirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginRight: '25px' }}>Access Token</div>
        <input
          type='text'
          onInput={(e) => {
            setApikey(e.target.value);
          }}
          value={apikey}
          style={{ maxWidth: '1000px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexdirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginRight: '25px' }}>Store Domain</div>
        <input
          type='text'
          onInput={(e) => {
            setShop(e.target.value);
          }}
          value={shop}
          style={{ maxWidth: '200px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexdirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginRight: '25px' }}>Timeout</div>
        <input
          type='text'
          onInput={(e) => {
            if (Number(e.target.value) < 1000 && Number(e.target.value) > 300) {
              setTimeout(e.target.value);
            } else {
              setTimeout('300');
            }
          }}
          value={request_timeout}
          style={{ maxWidth: '50px' }}
        />
      </div>
      <input
        type='button'
        value='Submit'
        onClick={updateSettings}
        className='Button3'
        style={{
          borderRadius: '8px',
          fontWeight: 'bold',
          marginTop: '5%',
          width: '150px',
          marginLeft: '25%',
        }}
      ></input>
    </div>
  );
}

export default Settings;
