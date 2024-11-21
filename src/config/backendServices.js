export const getToursAll = async () => {
    try{
        const response = await fetch('https://costaricahills-backend.onrender.com/toursAll');
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }  
};