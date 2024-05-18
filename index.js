//Experimenting with Asynch and await functions
/* 
 * Fetch data from an external API
 * Format data if required
 */

// Fetch data from an external API
async function fetchHolidays() {
    try {
        const apiKey = 'tu7K51aVvSfu4wPM1VWEUuYm5CzqJI3c';
        const url = 'https://calendarific.com/api/v2/holidays';
        const headers = { 'Content-Type': 'application/json' };
        const params = { 'api_key': apiKey, 'country': 'UK', 'year': '2020' };

        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${url}?${queryString}`;

        const response = await fetch(fullUrl, { headers });
        const status = response.status;
        const responseBody = await response.json();

        if (status === 200) {
            console.log('Success');
            return { status: true, data: responseBody };
        } else {
            console.log('Error status:', status);
            return { status: false, error: 'Error status: ' + status };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return { status: false, error: error };
    }
}

async function loadAndFetchHolidays() {
    try {
        const response = await fetchHolidays();

        if (response.status) {
            const data = response.data.response.holidays;
            const holidayList = document.getElementById('holidayList');
            data.forEach(holiday => {
                const listItem = document.createElement('li');
                listItem.textContent = holiday.name;
                holidayList.appendChild(listItem);
            });
        } else {
            console.error(response.error);
            const holidayList = document.getElementById('holidayList');
            const listItem = document.createElement('li');
            listItem.textContent = 'There was an error fetching data from the API';
            holidayList.appendChild(listItem);
        }
    } catch (error) {
        console.error(error);
    }
}

// Call loadAndFetchHolidays when the window loads
window.onload = loadAndFetchHolidays;