

export const readTotalCollection =  async ( 
    setTotalCollection2022: React.Dispatch<React.SetStateAction<number>>,
    setTotalCollection2023: React.Dispatch<React.SetStateAction<number>>,
    setPercentageCollection: React.Dispatch<React.SetStateAction<number>>,
    setTotalCollection: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    
    try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-collection`);
        const result = await response.json();
        const totalCollection2022 = result.reduce((total:any, entry:any) => total + entry["2022"], 0);
        const totalCollection2023 = result.reduce((total:any, entry:any) => total + entry["2023"], 0);
        const percentageChange = ((totalCollection2023 - totalCollection2022) / totalCollection2022) * 100;
        setTotalCollection2022(totalCollection2022)
        setTotalCollection2023(totalCollection2023)
        setPercentageCollection(percentageChange)
        setTotalCollection(result)
        setLoading(false)
    } catch (e) {
        console.log(e);
        setLoading(false)
    }
}

export const readTotalTransaction =  async ( 
    setTransaction2022: React.Dispatch<React.SetStateAction<number>>,
    setTransaction2023: React.Dispatch<React.SetStateAction<number>>,
    setPercentageTransaction: React.Dispatch<React.SetStateAction<number>>,
    setTotalTransaction: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    
    try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-transaction`);
        const result = await response.json();
        const totalTransaction2022 = result.reduce((total:any, entry:any) => total + entry["2022"], 0);
        const totalTransaction2023 = result.reduce((total:any, entry:any) => total + entry["2023"], 0);
        const percentageChange = ((totalTransaction2023 - totalTransaction2022) / totalTransaction2022) * 100;
        setTransaction2022(totalTransaction2022)
        setTransaction2023(totalTransaction2023)
        setPercentageTransaction(percentageChange)
        setTotalTransaction(result)
        setLoading(false)
    } catch (e) {
        console.log(e);
        setLoading(false)
    }
}

export const readUpcomingFpx =  async ( 
    setUpcomingFpx: React.Dispatch<React.SetStateAction<number>>,
    setTotalUpcomingFpx: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/upcoming-fpx`);
        const result = await response.json();
        const totalOverallFpxPayout: number = result.reduce(
            (sum:any, item:any) => sum + item.total, 0
        );
        setTotalUpcomingFpx(totalOverallFpxPayout)
        setUpcomingFpx(result)
        setLoading(false)
    } catch (e) {
        console.log(e);
        setLoading(false)
    }
}


export const readTotalPayout =  async ( 
    setPayout2022: React.Dispatch<React.SetStateAction<number>>,
    setPayout2023: React.Dispatch<React.SetStateAction<number>>,
    setPercentagePayout: React.Dispatch<React.SetStateAction<number>>,
    setTotalPayout: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    
    try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/total-payout`);
        const result = await response.json();
        const totalPayout2022 = result.reduce((total:any, entry:any) => total + entry["2022"], 0);
        const totalPayout2023 = result.reduce((total:any, entry:any) => total + entry["2023"], 0);
        const percentageChange = ((totalPayout2022 - totalPayout2023) / totalPayout2022) * 100;
        setPayout2022(totalPayout2022)
        setPayout2023(totalPayout2023)
        setPercentagePayout(percentageChange)
        setTotalPayout(result)
        setLoading(false)
    } catch (e) {
        console.log(e);
        setLoading(false)
    }
}

export const readTop5Performing =  async ( 
    setTop5Performing: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-top5`);
        const result = await response.json();
        setTop5Performing(result)
        setLoading(false)
    } catch (e) {
        console.log(e);
        setLoading(false)
    }
}

export const readActiveInactive =  async ( 
    setActiveInactive: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/active-inactive-collection`);
        const result = await response.json();
        setActiveInactive(result)
    } catch (e) {
        console.log(e);
    }
}

export const readPaymentMethod =  async ( 
    setPaymentMethod: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/payment-collection`);
        const result = await response.json();
        setPaymentMethod(result)
    } catch (e) {
        console.log(e);
    }
}