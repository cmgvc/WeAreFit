const currentUrl = window.location.href; 
var url = 'http://localhost:8080';

export const getUrl = () => {
    if (currentUrl.includes('localhost')) {
        url = 'http://localhost:8080';
    } else {
        url = 'https://18.191.153.252:8080';
    }
    return url;
}