export interface CollectionLineChart{
    [key: string]: number;
}

export interface CollectionPieChart{
    data:string[]
}

export interface CollectionTop5{
    id:number,
    date:string,
    total:number
}

export interface CollectionFpxUpcoming{
    id:number,
    date:string,
    total:number
}

export interface CollectionItem{
    id: number;
    title: string;
    total: number;
    percentageValue: number;
    collection_name: string,
    collection_id: string,
    total_collected: number,
    status:string,
    volume: number,
    created_at: string,
}

export interface Subscribe{
    title:string,
    price:string,
    item:string[]
}