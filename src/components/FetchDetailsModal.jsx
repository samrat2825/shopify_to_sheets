import { useState, useEffect } from 'react';
import { getConfig } from '../helper/firebaseMethods/index';
import Client from 'shopify-buy';
import { setLoading, resetLoading } from '../redux/Actions/actions';
import exportFromJSON from 'export-from-json';

function FetchDetailsModal(props) {
  const [apikey, setApikey] = useState('');
  const [shop, setShop] = useState('');
  const [request_timeout, setTimeout] = useState('300');
  const [error, setError] = useState('');
  const [endpoint, setEndpoint] = useState('');

  let client = '';
  const fileName = 'download';
  const exportType = 'xls';

  const ExportToExcel = (data) => {
    exportFromJSON({ data, fileName, exportType });
  };

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

  useEffect(() => {
    if (apikey !== '' && shop !== '') {
      client = Client.buildClient({
        storefrontAccessToken: apikey,
        domain: shop,
      });
    }
  }, [apikey, shop]);

  const fetchProducts = async () => {
    //   let result:
    if (client !== '') {
      //   console.log(apikey, shop, client);
      await client.product
        .fetchAll()
        .then((products) => {
          console.log(products);
          return products;
        })
        .catch((e) => console.log(e));
    }
  };
  const shopInfo = async () => {
    if (client !== '') {
      //   console.log(apikey, shop, client);
      await client.shop
        .fetchInfo()
        .then((products) => {
          console.log(products);
          return products;
        })
        .catch((e) => console.log(e));
    }
  };
  const fetchShopPolicy = async () => {
    if (client !== '') {
      //   console.log(apikey, shop, client);
      await client.shop
        .fetchPolicies()
        .then((products) => {
          console.log(products);
          return products;
        })
        .catch((e) => console.log(e));
    }
  };

  const handleEndpoint = (e) => {
    if (e.target.value === 'Products') {
      setEndpoint('Products');
    } else if (e.target.value === 'Shop Policy') {
      setEndpoint('Shop Policy');
    } else {
      setEndpoint('Shop Info');
    }
  };

  const submit = () => {
    if (error.length) {
      props.openFetchingCurrData(false);
      return;
    }

    let result = [{ 0: '' }, { 1: '' }];
    setLoading();
    props.openFetchingCurrData(false);
    if (endpoint === 'Products') {
      result = JSON.parse(JSON.stringify(fetchProducts()));
    } else if (endpoint === 'Shop Policy') {
      result = JSON.parse(JSON.stringify(fetchShopPolicy()));
    } else {
      result = JSON.parse(JSON.stringify(shopInfo()));
    }
    if (Object.keys(result).length == 0) {
      result = [{ 0: '' }, { 1: '' }];
    }
    resetLoading();
    // console.log(result, Object.keys(result).length);
    ExportToExcel(result);
  };

  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        position: 'absolute',
        top: '200px',
        left: '350px',
        right: '350px',
        bottom: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div
        style={{
          color: 'red',
          marginBottom: '10px',
          fontWeight: 'bold',
          fontSize: 30,
        }}
      >
        {error.length ? error : ''}
      </div>
      <div style={{ fontSize: 25, fontWeight: 'bold' }}>Details</div>
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
        <div style={{ marginRight: '25px' }}>Endpoint</div>
        <select id='endpoint' onChange={handleEndpoint}>
          <option value='Products'>Products</option>
          <option value='Shop Policy'>Shop Policy</option>
          <option value='Shop Info'>Shop Info</option>
        </select>
      </div>
      <input
        type='button'
        value='Submit'
        onClick={submit}
        className='Button3'
        style={{
          borderRadius: '8px',
          fontWeight: 'bold',
          marginTop: '5%',
          width: '100px',
        }}
      ></input>
    </div>
  );
}

export default FetchDetailsModal;
