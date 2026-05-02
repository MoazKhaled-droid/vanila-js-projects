import { countryCities } from "./constants.js";

export function populateSelect() {
    const selectElement = $('#country-select');
    if (!selectElement.length) return;

    let options = '<option value="">Search City...</option>';
    
    for (let code in countryCities) {
        countryCities[code].forEach(city => {
            options += `<option value="${city},${code}">${city}</option>`;
        });
    }
    
    selectElement.html(options);
}