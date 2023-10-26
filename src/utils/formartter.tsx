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