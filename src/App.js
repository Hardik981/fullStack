import './App.css';
import { useState, createContext } from 'react';
import Form from './Components/Form';
import Table from './Components/Table';
export const UserContext = createContext()
function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="App">
      {showForm ? <Form showForm={setShowForm} /> : <button className='btn' onClick={() => setShowForm(true)}>Add</button>}
      <Table />
    </div>
  );
}

export default App;
