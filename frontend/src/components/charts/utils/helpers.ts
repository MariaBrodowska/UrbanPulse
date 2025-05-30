// Funkcja przeskalowania logarytmicznego danych
export const logarithmicScale = (data: Record<string, number>): Record<string, number> => {
    const values = Object.values(data);
    
    // Sprawdź czy wszystkie wartości są takie same
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (max === min) {
        // Jeśli wszystkie wartości są takie same, zwróć oryginalne dane
        return data;
    }
    
    // Znajdź minimalną dodatnią wartość dla bezpiecznego logarytmu
    const minPositive = Math.min(...values.filter(v => v > 0));
    
    if (minPositive <= 0) {
        // Jeśli nie ma dodatnich wartości, zwróć oryginalne dane
        return data;
    }
    
    return Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        if (value <= 0) {
            // Dla wartości <= 0, użyj 0
            acc[key] = 0;
        } else {
            // Użyj logarytmu dziesiętnego i przeskaluj dla lepszej czytelności
            // log10(value) + offset żeby uniknąć ujemnych wartości
            const logValue = Math.log10(value);
            // Dodaj offset bazujący na najmniejszej wartości
            const offset = Math.abs(Math.log10(minPositive)) + 1;
            acc[key] = logValue + offset;
        }
        return acc;
    }, {} as Record<string, number>);
};

// Budowanie URL z filtrami
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
