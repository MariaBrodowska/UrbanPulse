// Funkcja przeskalowania logarytmicznego danych
export const logarithmicScale = (data: Record<string, number>): Record<string, number> => {
    const values = Object.values(data);
    
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (max === min) {
        return data;
    }
    
    
    const minPositive = Math.min(...values.filter(v => v > 0));
    
    if (minPositive <= 0) {
        return data;
    }
    
    return Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        if (value <= 0) {
            acc[key] = 0;
        } else {
           
            const logValue = Math.log10(value);
          
            const offset = Math.abs(Math.log10(minPositive)) + 1;
            acc[key] = logValue + offset;
        }
        return acc;
    }, {} as Record<string, number>);
};

export const buildFilterUrl = (baseUrl: string, filters: Record<string, any>): string => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v.toString()));
            } else {
                params.append(key, value.toString());
            }
        }
    });

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};
