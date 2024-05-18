//Experimenting with promises


function fetchHolidays() {
    return new Promise((resolve, reject) => {
        const apiKey = 'tu7K51aVvSfu4wPM1VWEUuYm5CzqJI3c';
        const url = 'https://calendarific.com/api/v2/holidays';
        const headers = { 'Content-Type': 'application/json' };
        const params = { 'api_key': apiKey, 'country': 'UK', 'year': '2020' };

        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${url}?${queryString}`;

        fetch(fullUrl, { headers })
            .then(response => {
                const status = response.status;
                if (status === 200) {
                    console.log('Success');
                    response.json().then(data => {
                        resolve({ status: true, data: data });
                    }).catch(error => {
                        reject(error);
                    });
                } else {
                    console.log('Error status:', status);
                    reject({ status: false, error: 'Error status: ' + status });
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                reject({ status: false, error: error });
            });
    });
}

function loadAndFetchHolidays() {
    return new Promise((resolve, reject) => {
        fetchHolidays()
            .then(response => {
                if (response.status) {
                    const data = response.data.response.holidays;
                    const holidayList = document.getElementById('holidayList');
                    data.forEach(holiday => {
                        const listItem = document.createElement('li');
                        listItem.textContent = holiday.name;
                        holidayList.appendChild(listItem);
                    });
                    resolve('Holidays loaded successfully.');
                } else {
                    console.error(response.error);
                    const holidayList = document.getElementById('holidayList');
                    const listItem = document.createElement('li');
                    listItem.textContent = 'There was an error fetching data from the API';
                    holidayList.appendChild(listItem);
                    reject(response.error);
                }
            })
            .catch(error => {
                console.error('Unexpected error:', error);
                reject('Unexpected error occurred.');
            });
    });
}

// Call loadAndFetchHolidays when the window loads
window.onload = function() {
    loadAndFetchHolidays()
        .then(message => {
            console.log(message);
       })
        .catch(error => {
           console.error(error);
       });
};
