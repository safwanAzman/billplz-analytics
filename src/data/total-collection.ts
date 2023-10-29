const currentDate = new Date();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'short' });

export const data = [
    {
        "date": `1 ${currentMonth}`,
        "2022": 600,
        "2023": 480
    },
    {
        "date": `6 ${currentMonth}`,
        "2022": 560,
        "2023": 240
    },
    {
        "date": `12 ${currentMonth}`,
        "2022": 800,
        "2023": 450
    },
    {
        "date": `18 ${currentMonth}`,
        "2022": 10,
        "2023": 20
    },
    {
        "date": `28 ${currentMonth}`,
        "2022": 500,
        "2023": 120
    },
    {
        "date": `${currentDate.getDate()} ${currentMonth}`,
        "2022": 500,
        "2023": 600
    }
]