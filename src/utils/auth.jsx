import { jwtDecode } from 'jwt-decode';

export function getLoggedInUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // full user info from token
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

export function getLoggedInUserId() {
  const user = getLoggedInUser();
  // If your JWT uses a different field, adjust here (e.g., user.user_id)
  return user?.id || user?.user_id || null;
}

