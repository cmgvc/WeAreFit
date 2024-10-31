const currentUrl = window.location.href; 
var url = 'http://localhost:3001';

export const getUrl = () => {
    if (currentUrl.includes('localhost')) {
        // url = 'https://wearefit.onrender.com';
        url = 'http://localhost:3001';
    } else {
        url = 'https://wearefit.onrender.com';
    }
    return url;
}