import { getShippintTime } from "@/state/products/productsSelector";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCalculateShipping = (): ([{flag: boolean, response: string}, Dispatch<SetStateAction<{ flag: boolean; response: string; }>>]) => {
    const [message, setMessage] = useState({
        flag: false,
        response: ''
      });
    const shippingTime = useSelector(getShippintTime)

    useEffect(() => {
      if(shippingTime) {
        const deliveryDate = new Date(shippingTime.data.real_date)
         const today = new Date()
         const diffTime = Math.abs(deliveryDate.getTime() - today.getTime());
         const diffDays = Math.round((diffTime / (1000 * 60 * 60 * 24))); 

          if(diffDays < 1){
           setMessage({
             flag: true,
             response: 'Estás a menos de 24hs del descanso perfecto 🤩'
           });
       }else if(diffDays >= 1 && Math.ceil(diffDays)<11){
         setMessage({
           flag: true,
           response: `Estás a ${Math.ceil(diffDays)} días del descanso perfecto 🤩`
         });
       }else{
         setMessage({
           flag: true,
           response: `Te lo entregamos el ${deliveryDate.getDate()}/${deliveryDate.getMonth() + 1}/${deliveryDate.getFullYear()} 🤝✨`
         });
       } 
      }
    }, [shippingTime])

    return [message, setMessage]
}

export default useCalculateShipping