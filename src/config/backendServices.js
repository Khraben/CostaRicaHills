export const getToursAll = async () => {
    try{
        const response = await fetch('https://costaricahills-backend.onrender.com/toursAll');
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }  
};

export const addReservation = async (tourId, userId, tourStartDate, endDate, people, estado) => {
    if (endDate == null) {
        endDate = tourStartDate;
    }
    const params = new URLSearchParams();
    params.append('tour_id', tourId);
    params.append('user_id', userId);
    params.append('startDate', tourStartDate);
    params.append('endDate', endDate);
    params.append('cant_persons', people);
    params.append('status', estado);

    try {
        const response = await fetch('https://costaricahills-backend.onrender.com/Addreserves', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const getReservationbyUser = async (userId) => {
    try {
        const response = await fetch(`https://costaricahills-backend.onrender.com/getReservesByUser/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};