// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function VerifyEmailPage() {
//   const [message, setMessage] = useState('Verifying...');
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const token = query.get('token');

//     if (!token) {
//       setMessage('Invalid verification link');
//       return;
//     }

//     fetch(`http://localhost:5000/verify-email?token=${token}`)
//       .then((res) => res.text())
//       .then((text) => setMessage(text))
//       .catch(() => setMessage('Verification failed'));
//   }, [location]);

//   return (
//     <div>
//       <h2>Email Verification</h2>
//       <p>{message}</p>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function VerifyEmailPage() {
//   const [message, setMessage] = useState('Verifying...');
// const { token } = useParams();
  
 

//   useEffect(() => {
//   if (!token) {
//     setMessage("Invalid verification link");
//     return;
//   }

//   fetch(`http://localhost:5000/api/auth/verify-email/${token}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) {
//         setMessage("Email verified successfully!");
//       } else {
//         setMessage(`Verification failed: ${data.message}`);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       setMessage("An error occurred during verification.");
//     });
// }, [token]);

//   return (
//     <div>
//       <h2>Email Verification</h2>
//       <p>{message}</p>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VerifyEmailPage() {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying email...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📦 Token from URL:", token);

    if (!token) {
      setMessage('Invalid verification link.');
      setLoading(false);
      return;
    }

    // const backendURL = `http://localhost:5000/api/auth/verify-email/${token}`;
    const backendURL = `http://localhost:5000/api/verify-email/${token}`;

    console.log("🔁 Calling backend with URL:", backendURL);

    fetch(backendURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Backend response:", data);
        if (data.success) {
          setMessage('✅ Email verified successfully!');
        } else {
          setMessage(`❌ Verification failed: ${data.message}`);
        }
      })
      .catch((err) => {
        console.error("❌ Network error:", err);
        setMessage('❌ Error verifying email.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      <p>{loading ? 'Please wait...' : message}</p>
    </div>
  );
}

export default VerifyEmailPage;
