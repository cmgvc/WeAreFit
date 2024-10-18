
export const fetchRandomWorkout = async () => {
    // setLoading(true);
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/challenge`); 
        return await response.json();
        // setBeginner(data.beginnerWorkout);
        // setIntermediate(data.intermediateWorkout);
        // setAdvanced(data.advancedWorkout);
    } catch (error) {
        console.error('Error fetching the text file:', error);
    } finally {
        // setLoading(false);
    }
};