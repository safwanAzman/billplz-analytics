import { format } from 'date-fns';

export function moneyFormat(amount:number) {
    const formatter = new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        
    });
return formatter.format(amount);
}

export function dateFormat(date: string, formatString: string) {
    return format(new Date(date), formatString);
}

export function calulateTotalGeneral(data:any[]) {
    const totalPayout = data.reduce((sum, item) => sum + item.total, 0);
    return totalPayout;
}

export function calculateTotal (data:any[]) : number {
    return data.reduce((accumulator, currentItem) => {
        for (const key in currentItem) {
            if (key !== 'date' && typeof currentItem[key] === 'number') {
                accumulator += currentItem[key];
            }
        }
        return accumulator;
    }, 0);
}

export function calculateOverallPercentage(data: any[]): string {
    let total = 0;
    const totalPeryear: { [key: string]: number } = {};
    for (const item of data) {
        for (const key in item) {
            if (key !== 'date' && typeof item[key] === 'number') {
                total += item[key];
                if (totalPeryear[key] === undefined) {
                    totalPeryear[key] = 0;
                }
                totalPeryear[key] += item[key];
            }
        }
    }
    const years = [];
    for (const key in totalPeryear) {
        years.push(key);
    }
    const latestYear = Math.max(...years.map(year => parseInt(year, 10)));
    const previousYear = Math.min(...years.map(year => parseInt(year, 10)));
    const calculatePercentageChange = ((totalPeryear[latestYear] - totalPeryear[previousYear]) / totalPeryear[previousYear]) * 100;
    const percentageChange = Math.abs(calculatePercentageChange).toFixed(2);
    if (isNaN(parseFloat(percentageChange))) {
        return '0';
    } else {
        return percentageChange;
    }
}
