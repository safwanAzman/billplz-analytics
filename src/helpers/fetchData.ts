export const fetchData = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [] as T;
    }
};