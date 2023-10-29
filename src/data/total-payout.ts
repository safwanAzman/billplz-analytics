const currentDate = new Date();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'short' });

export const data = [
    {
        "date": `1 ${currentMonth}`,
        "2022": 50,
        "2023": 50
    },
    {
        "date": `6 ${currentMonth}`,
        "2022": 20,
        "2023": 20
    },
    {
        "date": `12 ${currentMonth}`,
        "2022": 40,
        "2023": 70
    },
    {
        "date": `18 ${currentMonth}`,
        "2022": 10,
        "2023": 80
    },
    {
        "date": `28 ${currentMonth}`,
        "2022": 40,
        "2023": 20
    },
    {
        "date": `${currentDate.getDate()} ${currentMonth}`,
        "2022": 400,
        "2023": 200
    }
]