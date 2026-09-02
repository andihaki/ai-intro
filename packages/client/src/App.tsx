import { useEffect, useState } from 'react';

import { Button } from './components/ui/button';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="p-5">
      <p className="font-bold">Message: {message}</p>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
