import moment from 'moment-timezone';

const isChatbotActive = () => {
    const now = moment().tz("America/Buenos_Aires");
    const dayOfWeek = now.day();
    const hour = now.hour();

    const date = now.date();
    const month = now.month();

    const isHoliday = (month == 3 && date < 3) || (month == 2 && date > 26);

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 22 && !isHoliday) {
        return true;
    }
    return false;
};

export const ActivateNotChatbot = () => isChatbotActive();
