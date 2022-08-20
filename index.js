// Different ways to fetch data from API
//To make console cleaner I have commented console.log(s)
/****************************************/
//Using XMLHttpRequest
/****************************************/
const req = new XMLHttpRequest();

//using onload method if the response is ok
req.onload = function (){
    //console.log("Success!");
    //storing the parsed JSON data
    const data = JSON.parse(this.responseText);
    //getting the results that contain our main data from the response
    //console.log(data)
}

//using onerror mothod if any error
req.onerror = function() {
    console.log("Error!");
    console.log(this)
}

//opening the req
req.open('GET', 'https://swapi.dev/api/people/1/')
//sending the request
req.send()



/****************************************/
//Using fetch method
/****************************************/

/* First without using async function.
With this we can get the data.
Although, if we have multiple requests this method can end up with lots of promises. */
fetch('https://swapi.dev/api/people/1/')
    .then(res => {
        //console.log('RESOLVED!', res)
        return res.json()
    })
    .then((data) => {
        //console.log('JSON done!' ,data)
        return fetch('https://swapi.dev/api/people/2/')
    })
    .then((res) => {
        //console.log('2nd request resloved!')
        return res.json()
    })
    //And so on
    .catch((e) => {
        console.log('ERROR!', e)
    })


/* Now, with async function we can optimize the code above.
 NOTE: There is still a better way to write this code using an id as an argument. */
const loadDataFromAPI = async () => {
    try{
        const res = await fetch('https://swapi.dev/api/people/1/')
        const data = await res.json();
        //console.log(data)
        const res2 = await fetch('https://swapi.dev/api/people/2/')
        const data2 = await res2.json();
        //console.log(data2)
    }
    catch(e){
        console.log('ERROR!', e)
    }
}

loadDataFromAPI()


/****************************************/
//Using AXIOS library
/****************************************/
const getDataUsingAxios = async (id) => {
    try{
        //Getting data using axios from the API end point with the specified id
        const res = await axios.get(`https://swapi.dev/api/people/${id}/`)
        console.log(res.data)
        //accessing the html tag and passing the data
        document.getElementById('result').innerText = res.data.name;
    }
    catch(e){
        console.log('ERROR!', e)
    }
}
//prompting for the id number
let id = prompt('Insert ID numner')
//passing that id to our function that gets data and an argument
getDataUsingAxios(id)

