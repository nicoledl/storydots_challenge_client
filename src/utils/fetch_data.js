import { getToken } from "./get_token";

async function getAllList(path){
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

async function getOne(path, id){
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

async function deleteProduct(path, id){
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
            throw new Error(`Failed to fetch ${path}`);
        }

        return 200;
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return null;
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
          })

        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }

        return "The operation was successful.";
    } catch (error) {
        console.error(`Error fetching ${path}:`, error);
        return null;
    }
}


export { getAllList, getOne, deleteProduct, add_and_edit };