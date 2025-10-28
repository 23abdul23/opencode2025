import { useAuth } from "contexts/AuthContext";

export async function fetchLoggedInBasicDetails() {
  const token = localStorage.getItem('token');
  const auth = useAuth();

  console.log('Fetched Token:', token);

  if (token === null) {
    console.log('No token found, redirecting to login.');
    // auth.check_login();
  } 
  else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Hahah: ', response)

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
      return;
    }
    const data = (await response.json()).data;
    console.log('Fetched User Data:', data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

}

export async function sendRegData(formData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      console.log('Success!');
    } else {
      console.error('Registration failed:', response.statusText);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error sending registration data:', error.message);
  }
}

export async function getUserProfileByName(profileName) {
  const token = localStorage.getItem('token');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/${profileName}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}
