// Simple auth utility to manage user identity
// In a real app, this would handle tokens and user sessions

export const getUserId = () => {
    if (typeof window !== 'undefined') {
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            return parseInt(storedId);
        }
    }
    // Default to 1 for development/testing if no user is logged in
    return 1;
};

export const setUserId = (id) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userId', id.toString());
    }
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
    }
};
