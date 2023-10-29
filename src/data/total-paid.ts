const currentDate = new Date();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'short' });

export const data = [
    {
        "date": `1 ${currentMonth}`,
        "2022": 900,
        "2023": 200
    },
    {
        "date": `6 ${currentMonth}`,
        "2022": 200,
        "2023": 200
    },
    {
        "date": `12 ${currentMonth}`,
        "2022": 400,
        "2023": 700
    },
    {
        "date": `18 ${currentMonth}`,
        "2022": 100,
        "2023": 800
    },
    {
        "date": `28 ${currentMonth}`,
        "2022": 300,
        "2023": 502
    },
    {
        "date": `${currentDate.getDate()} ${currentMonth}`,
        "2022": 400,
        "2023": 200
    }
];
