import React, { useEffect, useState } from 'react';

function HelloWorld() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => setMessage('Error: ' + error));
  }, []);

  return (
    <div>
      <h1>Spring Boot API Response:</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;
