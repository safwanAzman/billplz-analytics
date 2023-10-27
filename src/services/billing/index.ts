
export const readTop5Performing =  async ( 
    setTop5Performing: React.Dispatch<React.SetStateAction<number>>,
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-top5`);
        const result = await response.json();
        setTop5Performing(result)
    } catch (e) {
        console.log(e);
    }
}

export const readTotalCollection =  async ( 
    setTotalCollection: React.Dispatch<React.SetStateAction<number>>,
    setTotalCollectionActive: React.Dispatch<React.SetStateAction<number>>,
    setTotalCollectionInActive: React.Dispatch<React.SetStateAction<number>>,
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOCKUP_API_URL}/collection-billing`);
        const result = await response.json();
        const activeData = result.filter((item:any) => item.status === 'active');
        const inactiveData = result.filter((item:any) => item.status === 'inactive');
        setTotalCollectionActive(activeData)
        setTotalCollectionInActive(inactiveData)
        setTotalCollection(result)
    } catch (e) {
        console.log(e);
    }
}
