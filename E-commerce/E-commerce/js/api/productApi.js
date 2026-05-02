const allProductsUrlP1 = "https://dummyjson.com/products?limit=";
const allProductsUrlP2 = "&skip="
const catigorysUrl = "https://dummyjson.com/products/categories";
const oneCatigoryUrl = "https://dummyjson.com/products/category/";
const searchUrl = "https://dummyjson.com/products/search?q=";
const productByIdUrl = "https://dummyjson.com/products/"

export async function getProducts(skip = 0,limit =20) {
    const res = await fetch(`${allProductsUrlP1}${limit}${allProductsUrlP2}${skip}`);
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getCatigorys() {
    const res = await fetch(catigorysUrl);
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getOneCatigory(category) {
    const res = await fetch(`${oneCatigoryUrl}${category}`);
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getSearchProducts(term) {
    const res = await fetch(`${searchUrl}${term}`);
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getProductById(id){
    const res = await fetch(`${productByIdUrl}${id}`)
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
    return data;
}