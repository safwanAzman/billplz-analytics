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

export function calculateTotalForYear(data: any[], year: string): number {
    return data.reduce((total, entry) => total + entry[year], 0);
}

export function calculatePercentageChange(newValue: number, oldValue: number): number {
    return ((newValue - oldValue) / oldValue) * 100;
}