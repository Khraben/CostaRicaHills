import { collection, getDocs,addDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const addReservaTour = async (TourId, UserId) => {
    try {
      await addDoc(collection(db, "toursReserva"), {
        tourId: TourId,
        userId: UserId,
      });
      console.log("Reservation added successfully");
    } catch (error) {
      console.error("Error adding Tour Reserva: ", error);
    }
  };

  export const getReservasByUser = async (userId) => {
    try {
      const q = query(collection(db, "toursReserva"), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const reservas = [];
      querySnapshot.forEach((doc) => {
        reservas.push(doc.data());
      });
      return reservas;
    } catch (error) {
      console.error("Error getting user reservas: ", error);
      return [];
    }
  };