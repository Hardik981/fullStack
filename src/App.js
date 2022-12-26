import './App.css';
import { useState, createContext, useEffect } from 'react';
import Form from './Components/Form';
import Table from './Components/Table';
export const UserContext = createContext()

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [sendDataNow, setSendDataNow] = useState(false)
  useEffect(() => {
    if (sendDataNow) {
      fetch('http://127.0.0.1:3001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
      setSendDataNow(false)
    }
  }, [sendDataNow, formData]);
  return (
    <div className="App">
      {showForm ? <Form setShowForm={setShowForm} formData={formData} setFormData={setFormData} setSendDataNow={setSendDataNow} /> : <button className='btn' onClick={() => setShowForm(true)}>Add</button>}
      <Table />
    </div>
  );
}

export default App;
