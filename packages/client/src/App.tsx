import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.mesage);
      });
  }, []);

  return <p>Message: {message}</p>;
}

export default App;
