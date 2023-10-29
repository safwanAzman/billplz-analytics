const currentDate = new Date();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'short' });

export const data = [
    {
        "date": `1 ${currentMonth}`,
        "2022": 50,
        "2023": 10
    },
    {
        "date": `6 ${currentMonth}`,
        "2022": 20,
        "2023": 30
    },
    {
        "date": `12 ${currentMonth}`,
        "2022": 40,
        "2023": 40
    },
    {
        "date": `18 ${currentMonth}`,
        "2022": 25,
        "2023": 20
    },
    {
        "date": `28 ${currentMonth}`,
        "2022": 25,
        "2023": 20
    },
    {
        "date": `${currentDate.getDate()} ${currentMonth}`,
        "2022": 50,
        "2023": 50
    }
]