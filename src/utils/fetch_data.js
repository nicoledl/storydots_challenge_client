import { getToken } from "./get_token";

async function get_all(path){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}/`, { method: "GET"});

        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }

        const products = await response.json();
        return products;
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return null;
    }
}

async function get_by_id(path, id){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}/${id}`, { method: "GET"});

        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }
        
        const product = await response.json();
        return product;
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return null;
    }
}

async function delete_product(path, id){
    try {
        const token = getToken()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}/${id}`, 
        { 
          method: "DELETE",  
          headers: {
            "token": JSON.stringify(token),
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
            throw { message: response.statusText, status: response.status };
        }

        return response;
    } catch (error) {
        console.error(`Error fetching:`, error);
        throw error;
    }
}

async function add_and_edit(method, id, formData){
    try {
        const token = getToken()
        const URL = id ? `${process.env.NEXT_PUBLIC_API_URL}products/${id ? id : ''}` : `${process.env.NEXT_PUBLIC_API_URL}products/`
        
        const response = await fetch(URL, {
            method: method,
            body: JSON.stringify(formData),
            headers: {
                "token": JSON.stringify(token),
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw { message: response.statusText, status: response.status };
        }

        return response;
    } catch (error) {
        console.error(`Error fetching:`, error);
        throw error;
    }
}

async function add_brand(formData){
    try {
        const token = getToken()
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands`,  {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "token": JSON.stringify(token),
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw { message: response.statusText, status: response.status };
        }

        return response;
    } catch (error) {
        console.error(`Error fetching:`, error);
        throw error;
    }
}

async function delete_brand(id){
    try {
        const token = getToken()
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands/${id}`,  {
            method: 'DELETE',
            headers: {
                "token": JSON.stringify(token),
                'Content-Type': 'application/json'
            }
        })
        
        if (!response.ok) {
            throw { message: response.statusText, status: response.status };
        }

        return response;
    } catch (error) {
        console.error(`Error fetching:`, error);
        throw error;
    }
}

async function verify_token(){
    try {
        const token = getToken()
        if (!token) {
            throw { message: 'Not authorized', status: 401, ok: false };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}verify-token`, 
        { method: "GET", 
        headers: {
            "token": JSON.stringify(token),
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            throw { message: response.statusText, status: response.status, ok: false };
        }

        return response;
    } catch (error) {
        console.error(`Error fetching`, error);
        throw error;
    }
}


export { get_all, get_by_id, delete_product, add_and_edit, add_brand, delete_brand, verify_token };