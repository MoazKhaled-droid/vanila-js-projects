export async function fetchCat() {
    try {
        const url = "https://opentdb.com/api_category.php"
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error statua: ${res.status}`)
        }
        const cat = await res.json()
        return cat.trivia_categories;
    } catch (er) {
        console.warn(er.message);
    }

}