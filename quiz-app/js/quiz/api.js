export async function fetchQuestions(amount, diff, id) {
    try {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${id}&difficulty=${diff}&type=multiple`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.response_code !== 0) {
            const errorMessages = {
                1: "No Results",
                2: "Invalid Parameter"
            };
            throw new Error(errorMessages[data.response_code] || "Unknown API Error");
        }

        return data.results;
    } catch (er) {
        console.error("Fetch Error:", er.message);
        throw er; // عشان تمسك الخطأ في الـ UI وتطلعه لليوزر
    }
}