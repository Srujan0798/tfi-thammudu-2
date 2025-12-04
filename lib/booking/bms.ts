export function getBookMyShowLink(movieTitle: string, city: string = 'Hyderabad'): string {
    const query = encodeURIComponent(movieTitle);
    // BMS search URL pattern (this might change, but works for general search)
    return `https://in.bookmyshow.com/explore/home/${city.toLowerCase()}?search=${query}`;
}

export function getUSBookingLink(movieTitle: string): string {
    const query = encodeURIComponent(movieTitle);
    return `https://www.fandango.com/search?q=${query}`;
}
