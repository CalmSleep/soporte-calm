import { useEffect, useState } from "react";
import { IStyledComponent } from "styled-components"

export interface IProps {
  DivHour: IStyledComponent<"web", any>
  Text: IStyledComponent<"web", any>
  endPromotionDate:  Date
  Numbers: IStyledComponent<"web", any>
  format : {
    days: string,
    minutes: string,
    seconds: string,
    hours: string,
  }
}

const Countdown = ({ DivHour, endPromotionDate, Text, Numbers,  format}: IProps) => {
  interface CountdownState {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }
  const [remainingTime, setRemainingTime] = useState<CountdownState>({
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  });

  const targetDate = new Date(endPromotionDate??"");

  useEffect(() => {
    const timerID = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      return {
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0",
      };
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    setRemainingTime({
      days: String(days).padStart(2, "0"),
      hours: String(hours % 24).padStart(2, "0"),
      minutes: String(minutes % 60).padStart(2, "0"),
      seconds: String(seconds % 60).padStart(2, "0"),
    })
   
  };


  return (
    <DivHour $show={(remainingTime.hours + remainingTime.minutes + remainingTime.seconds) != "000"} suppressHydrationWarning={true}>
      <Text textTag="span" font="regular" fontSize="1em" color="white" align="center" responsiveMobile={{ width: "auto", fontSize:"0.8em"}}>
        Quedan
      </Text>
      {remainingTime.days > "00" && <><Numbers>{remainingTime.days}</Numbers><Text>{format.days}</Text></>}
      <Numbers>{remainingTime.hours}</Numbers><Text>{format.hours}</Text>
      <Numbers>{remainingTime.minutes}</Numbers><Text>{format.minutes}</Text>
      <Numbers>{remainingTime.seconds}</Numbers><Text>{format.seconds}</Text>
    </DivHour>
  );
};

export default Countdown;
