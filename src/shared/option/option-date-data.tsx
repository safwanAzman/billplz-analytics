export const optionFilterDate = [
    { label: 'Today', value: new Date() },
    { label: 'Last 7 Days', value: calculateDateMinusDays(new Date(), 7) },
    { label: 'This Month', value: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    { label: 'This Year', value: new Date(2023, 0, 1) },
];

function calculateDateMinusDays(date:any, days:any) {
    const result = new Date(date);
    result.setDate(date.getDate() - days);
    return result;
}

export const filterDataBySelected = (selected:any, data:any) => {
    const filterDate = selected.value ? new Date(selected.value) : new Date();

    if (selected.label === 'This Year') {
        const filterYear = filterDate.getFullYear();
        const filteredData = data.map((item:any) => {
            const { date, ...rest } = item;
            const filteredYear = Object.keys(rest).reduce((acc:any, key) => {
                if (new Date(key).getFullYear() === filterYear) {
                    acc[key] = rest[key];
                }
                return acc;
            }, {});
            return { date, ...filteredYear };
        });
        return filteredData;
    } else if (selected.label === 'This Month') {
        const filterYear = filterDate.getFullYear();
        const filterMonth = filterDate.getMonth();
    
        const filteredData = data.filter((item:any) => {
            const itemDate = new Date(item.date + ' ' + filterYear);
            return itemDate.getFullYear() === filterYear && itemDate.getMonth() === filterMonth;
        });
    
        return filteredData;

    } else if (selected.label === 'Last 7 Days') {
        const last7Days = new Date();
        last7Days.setDate(filterDate.getDate() - 7);
        const filteredData = data.filter((item:any) => {
            const itemDate = new Date(item.date + ' ' + filterDate.getFullYear());
            return itemDate >= last7Days;
        });
        return filteredData;
        
    } 
    else if (selected.label === 'Today') {
        const filterYear = filterDate.getFullYear();
        const filterMonth = filterDate.getMonth();
        const filterDay = filterDate.getDate();

        const filteredData = data.filter((item:any) => {
            const itemDate = new Date(item.date + ' ' + filterYear);
            return (
                itemDate.getFullYear() === filterYear &&
                itemDate.getMonth() === filterMonth &&
                itemDate.getDate() === filterDay
            );
        });
        return filteredData;
    }
    else {
        return data;
    }
};