import {useState, useEffect} from 'react';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import './App.css';
import {init, setHash,readHash} from './Web3Client';



function App() {
  
  const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU1NjlBRjI5MjI0ZDFDNjI1QUUwZDQzMjE0ZTE5Q0I4NzFhQUQ4RGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk5MjEwOTUxNzUsIm5hbWUiOiJQcm9nZXR0byJ9.p9dqW2LWdCcYAwOoHgQKOMZvl8pRzYMzv7YX6L4_MhU' });

  useEffect(() => {
    init();
  }, []); 

  function setCid(cid){
    setHash(cid).then(tx =>{
      console.log(tx);
    }).catch(err => {
      console.log(err);
      });
  }
  
  const [file, setFile] = useState('')
  
  function storeFiles (file) {
    const cid = client.put(file)
    cid.then(value => {

      console.log('stored files with cid:', value)
      setCid(value);
    });
  }  

  function handleCaptureFile(e) {
    e.preventDefault();
    console.log('capturing file...')
    const fileInput = document.getElementById('csvFile');
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
    setFile(fileInput.files)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    storeFiles(file)
  }

  return (
    <div id="App" >
      <header className='App-header'><h1>DIGITAL TWIN</h1></header>
        <div className="container">
          <h1>Benvenuto.</h1>
          <p>Inserisci qui il tuo file .csv</p>
          <form onSubmit={handleSubmit}>
            <input type='file' id='csvFile' accept=".csv" onChange={handleCaptureFile}></input>
            <input type='submit'></input>
          </form>
        </div>
        <div>
          <button onClick={readHash}>HASH</button>
        </div>
      </div>
  );
}

export default App;
