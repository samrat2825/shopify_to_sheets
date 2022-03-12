import FetchDetailsModal from './FetchDetailsModal';

function FetchData(props) {
  // const [apikey, setApikey] = useState('');
  // const [shop, setShop] = useState('');
  // const [request_timeout, setTimeout] = useState('300');
  // const [endpoint, setEndpoint] = useState('');

  // useEffect(() => {
  //   getConfig()
  //     .then((res) => {
  //       setApikey(res.config.apikey);
  //       setShop(res.config.shop);
  //       setTimeout(res.config.timeout);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <FetchDetailsModal openFetchingCurrData={props.openFetchingCurrData} />
    </div>
  );
}

export default FetchData;
