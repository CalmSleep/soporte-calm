export const calculateTimeRemaining = (targetDate: Date) => {
    const currentTime = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Argentina/Buenos_Aires'}));
    const timeDifference = targetDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0 || isNaN(timeDifference)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours % 24).padStart(2, "0"),
      minutes: String(minutes % 60).padStart(2, "0"),
      seconds: String(seconds % 60).padStart(2, "0"),
    };
};