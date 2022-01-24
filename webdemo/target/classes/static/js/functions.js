const store = () => {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const message = document.getElementById('message')?.value;

    if (!name) {
        alert('Please input your name');
    } else if (!validateEmail(email)) {
        alert('Please input valid email address');
    } else if (!message) {
        alert('Please input message!')
    } else {
        let dataList = [];
        let storedList = localStorage.getItem('contact_lists');
        if (storedList) dataList = JSON.parse(storedList);
        const contactInfo = { name, email, phone, message };
        console.log(dataList);
        dataList.push(contactInfo);
        localStorage.setItem('contact_lists', JSON.stringify(dataList));
        resetForm([name, email, phone, message]);
    }
}

const loadContactList = (selector) => {
    const headers = ["Name", "Email", "Phone", "Message"];
    // const appendData = "";
    let dataList = [];
    let storedList = localStorage.getItem('contact_lists');
    if (storedList) dataList = JSON.parse(storedList);
    // for (const data of dataList) {
    //     appendData += `<tr><td>${data.name}</td><td>${data.email}</td><td>${data.phone}</td><td>${data.message}</td><td>${data.created_date}</td> </tr>`
    // }
    // return appendData;
    const addHeaders = (selector) => {
        let columns = [];
        let header$ = $('<tr/>');
        for (let i = 0; i < dataList.length; i++) {
            var rowHash = dataList[i];
            for (let key in rowHash) {
                if ($.inArray(key, columns) == -1) {
                    columns.push(key);
                    header$.append($('<th/>').html(key.toUpperCase()));
                }
            }
        }
        $(selector).append(header$);
        return columns;
    }

    const colums = addHeaders(selector);

    for (let i = 0; i < dataList.length; i++) {
        let row$ = $('<tr/>');
        for (let colIndex = 0; colIndex < colums.length; colIndex++) {
            let cellValue = dataList[i][colums[colIndex]];
            if (cellValue == undefined) cellValue = '';
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

const resetForm = (inputs) => {
    for (const input of inputs) {
        input.value = undefined;
    }
}


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};