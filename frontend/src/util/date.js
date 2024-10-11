const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
export const formattedDate = today.toLocaleDateString('en-US', options);