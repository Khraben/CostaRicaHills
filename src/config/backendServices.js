export const getToursAll = async () => {
    try{
        const response = await fetch('https://costaricahills-backend.onrender.com/toursAll');
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }  
};

export const addReservation = async (tour,userId) => {
    try{
        const response = await fetch('https://costaricahills-backend.onrender.com/addReservation');
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }  
};