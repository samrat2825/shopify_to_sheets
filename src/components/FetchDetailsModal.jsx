import { useState, useEffect } from 'react';
import { getConfig } from '../helper/firebaseMethods/index';
import { setLoading, resetLoading } from '../redux/Actions/actions';
import exportFromJSON from 'export-from-json';
import { getAllProducts, getProductsInCollection } from '../helper/shopify';

function FetchDetailsModal(props) {
  const [apikey, setApikey] = useState('');
  const [shop, setShop] = useState('');
  const [request_timeout, setTimeout] = useState('300');
  const [error, setError] = useState('');
  const [endpoint, setEndpoint] = useState('Products');

  let client = '';
  const fileName = 'download';
  const exportType = 'xls';

  const ExportToExcel = (data) => {
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    getConfig()
      .then((res) => {
        if (res.apikey == '' || res.shop == '') {
          setError('Please Add Store Details');
        }
        // console.log(res, 'fetching');
        setApikey(res.apikey);
        setShop(res.shop);
        setTimeout(res.timeout);
      })
      .catch((e) => console.log(e));
  }, []);

  const fetchProducts = async () => {
    if (apikey !== '' && shop !== '') {
      const products = await getAllProducts(apikey, shop);
      // console.log(products);
      return products;
    } else {
      alert('Please Enter Valid Store Details');
    }
  };

  const shopInfo = async () => {
    if (apikey !== '' && shop !== '') {
      const products = await getProductsInCollection(apikey, shop);
      return products;
    } else {
      alert('Please Enter Valid Store Details');
    }
  };

  const fetchShopPolicy = async () => {
    if (apikey !== '' && shop !== '') {
      const products = await getProductsInCollection(apikey, shop);
      return products;
    } else {
      alert('Please Enter Valid Store Details');
    }
  };

  const handleEndpoint = (e) => {
    // console.log(e.target.value);
    if (e.target.value === 'Products') {
      setEndpoint('Products');
    } else if (e.target.value === 'Shop Policy') {
      setEndpoint('Shop Policy');
    } else {
      setEndpoint('Shop Info');
    }
  };

  // useEffect(() => {
  //   console.log(endpoint, 'endpoint');
  // }, [endpoint]);

  const submit = async () => {
    if (error.length) {
      props.openFetchingCurrData(false);
      return;
    }

    let result = [{ A: '' }, { B: '' }];
    setLoading();
    props.openFetchingCurrData(false);
    if (endpoint === 'Products') {
      console.log('fetching Products');
      result = await fetchProducts();
    } else if (endpoint === 'Shop Policy') {
      console.log('Shop Policy');
      result = await fetchShopPolicy();
    } else if (endpoint === 'Shop Info') {
      console.log('Shop Info');
      result = await shopInfo();
    }
    if (Object.keys(result).length == 0) {
      result = [
        { name: 'A', price: '15' },
        { name: 'B', price: '55' },
      ];
    }
    // reuslt = JSON.parse(result);
    resetLoading();
    console.log(endpoint, result, Object.keys(result).length);
    let output = [];
    for (let i = 0; i < Object.keys(result).length; i++) {
      output[i] = result[i].node;
    }
    // console.log(output);
    ExportToExcel(output);
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
          <option value='Shop Policy'>Home Page</option>
          {/* <option value='Shop Info'>Shop Info</option> */}
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
