import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    fetch('http://localhost:5173')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Welcome, {user.firstName}
      {user.lastName}!
    </div>
  );
}

export default App;
