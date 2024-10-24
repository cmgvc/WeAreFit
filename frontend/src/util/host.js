const currentUrl = window.location.href; 
var url = 'http://localhost:8080';

export const getUrl = () => {
    if (currentUrl.includes('localhost')) {
        url = 'https://wearefit.onrender.com';
        // url = 'http://localhost:8080';
    } else {
        url = 'https://wearefit.onrender.com';
    }
    return url;
}