const API_URL = "https://jsonplaceholder.typicode.com";
export default function fetcher(slug: string, init?: RequestInit) {
    return fetch(`${API_URL}${slug}`, init);
}
