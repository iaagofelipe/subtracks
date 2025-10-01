const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Esta função auxiliar irá configurar os cabeçalhos para nós
const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// Nosso wrapper para o fetch
export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        return response.json();
    },
    post: async (endpoint: string, body: any) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return response.json();
    },
    put: async (endpoint: string, body: any) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        return response.json();
    },
    delete: async (endpoint: string) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        // O método delete pode não retornar um corpo, então tratamos de forma diferente
        if (response.status === 204) {
            return { success: true };
        }
        return response.json();
    },
};