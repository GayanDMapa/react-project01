// Use the default import for jwt-decode
import * as jwtDecode from 'jwt-decode';
// Then use it as jwtDecode.jwtDecode()

export const getLoggedInUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token); // decode the JWT token
    return decoded.id; // adjust 'id' to your token's actual user id field
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};
