import { useState } from 'react'
import './App.css'
import { supabase } from './supabase-client.jsx'
import { BrowserRouter, HashRouter as Router, Routes, Route} from 'react-router-dom'
import History from './components/History.jsx'
import AddData from './components/addData.jsx'

function App() {
  const [newData, setNewData] = useState({name: '', age: ''})

  const handelSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from("test").insert(newData).single()

    if (error) {
      console.log(error)
    } else {
      console.log("Data inserted successfully")
    }

    setNewData({name: '', age: ''})
  }

  return (
    <>
      <Router>
        <form onSubmit={handelSubmit}>
          <label className="form-name" htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={newData.name} onChange={(e) => setNewData({...newData, name: e.target.value})}/>
          <label className="form-age" htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={newData.age} onChange={(e) => setNewData({...newData, age: e.target.value})} />
          <button type="submit">Submit</button>
        </form>
        <Routes>
          <Route path="/add-data" element={<AddData />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
