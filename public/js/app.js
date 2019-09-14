const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = 'Loading...';
weatherForm.addEventListener('submit',(event) => {
    event.preventDefault()
    const location = search.value;
    messageTwo.textContent = '';
    if(location) {
        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(!data.error){
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.weather;
                    console.log(data.weather)
                    console.log(data.location)
                    console.log(data.address)
                } else {
                    messageOne.textContent = data.error;
                    console.log(data.error)
                }
            })
        })
    } else {
        console.log("Enable to find this location!")
    }
})