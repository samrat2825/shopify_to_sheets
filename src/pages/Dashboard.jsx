import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { firestore } from '../firebaseSetup';
import { store } from '../redux/Store/store';
import Setting from '../components/Settings';
import FetchData from '../components/FetchData';

const Dashboard = (props) => {
  const [settings, openUserSettings] = useState(false);
  const [fetchingCurrData, openFetchingCurrData] = useState(false);

  const setAccountDetails = () => {
    openUserSettings((settings) => !settings);
  };

  const fetchStoreDetails = () => {
    openFetchingCurrData((fetchingCurrData) => !fetchingCurrData);
  };

  const showStoreDetails = () => {};

  return (
    <>
      <Nav />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '5%',
          paddingBottom: '10%',
        }}
      >
        {settings ? <Setting openUserSettings={openUserSettings} /> : <></>}
        <input
          type='button'
          value='Add Store Details'
          onClick={setAccountDetails}
          className='Button3'
          style={{
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '5%',
            width: '20%',
          }}
        ></input>
        {fetchingCurrData ? (
          <FetchData openFetchingCurrData={openFetchingCurrData} />
        ) : (
          <></>
        )}
        <input
          type='button'
          value='Fetch Data'
          onClick={fetchStoreDetails}
          className='Button3'
          style={{
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '5%',
            width: '20%',
          }}
        ></input>

        <input
          type='button'
          value='Show Last Fetched Data'
          onClick={showStoreDetails}
          className='Button3'
          style={{
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '5%',
            width: '20%',
          }}
        ></input>
      </div>
    </>
  );
};

export default Dashboard;
