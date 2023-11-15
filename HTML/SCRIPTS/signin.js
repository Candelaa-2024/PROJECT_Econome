function submit() {
    // get data from inputs 
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    const password = inputs[1].value; 
    const data = {
        "email": email,
        "password": password
    } 
    const jsonData = JSON.stringify(data);

    // build a request object
    const request = new XMLHttpRequest();

    // open a connection to my api 
    request.open("POST", "http://localhost:5000/api/signin");

    // customise the request 
    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    // specify what happens when data arrives 
    request.onload = processRequestToSendDataResponse;
    
    // specify what happens when an error occurs
    request.onerror = processErrorResponse; 

    // send the data 
    request.send(JSON.stringify(data));

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);

        if (request.status == 200) {
            const h1 = document.createElement("h1");
            h1.innerText = `Welcome, ${response.data.user_id}`;
            
            const body = document.getElementsByTagName("body")[0];
            body.appendChild(h1);

            localStorage.setItem("user-id", response.data.user_id);
            sessionStorage.setItem("user-id", response.data.user_id);
        }
    }

    function processErrorResponse() {
        const response = JSON.parse(request.response);
            
        if (request.status == 400) {
            const p = document.createElement("p");
            p.innerText = response.message; 

            const body = document.getElementsByTagName("body")[0];
            body.appendChild(h1);
        }
    }
}
(function() {
    var phrases = ["budgeting", "currency converter", "bill payment", "investment"];
    var currentIndex = 0;
    var element = document.querySelector('.typing-effect');
    var charIndex = -1;
    var typingDelay = 200;
    var erasingDelay = 100;
    var newTextDelay = 2000; 

    function type() {
        if (charIndex < phrases[currentIndex].length) {
            if(!element.classList.contains("typing")) element.classList.add("typing");
            element.textContent += phrases[currentIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > -1) {
            element.textContent = phrases[currentIndex].substring(0, charIndex);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            currentIndex = (currentIndex + 1) % phrases.length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        if (element) type();
    });
})();
