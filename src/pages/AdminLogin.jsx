// // src/pages/AdminLogin.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Check against static admin credentials
//     if (username === 'admin' && password === 'admin123') {
//       navigate('/dashboard');
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
//         <h2 className="text-black text-2xl mb-4">Admin Login</h2>
//         {error && <div className="text-red-500 mb-2">{error}</div>}
//         <div className="mb-4">
//           <label className="text-black block mb-1">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="text-black block mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5007/api/admin/login', { email, password }, { withCredentials: true });
      console.log(response.data);
      if (response.data.success) {
        console.log('Cookie: ' + document.cookie);
        navigate('/dashboard'); 
        //window.location.href = '/dashboard'; 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-black text-2xl mb-4">Admin Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="text-black block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-black block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? <Loader /> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
