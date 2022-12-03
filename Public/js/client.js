const socket = io();

let username;
let textInput = document.querySelector('#textInput');
let sendBtn = document.querySelector('#sendBtn')
let massageArea = document.querySelector('.caht_container');

do {
    username = prompt('Enter Your name: ');
} while (!username)


textInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMassage(e.target.value);
    }
})

function sendMassage(massages) {
    let msg = {
        user: username,
        massage: massages.trim()
    }


    appendMassage(msg, 'outgoing');
    textInput.value = '';

    // send to server
    socket.emit('massage', msg)


}

function appendMassage(msg, type) {
    // console.log(msg)
    // alert(msg.massage)
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'massage')

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.massage}</p>
    `;

    mainDiv.innerHTML = markUp

    massageArea.appendChild(mainDiv);
}

// recive massage

socket.on('massage', (msg) => {
    appendMassage(msg, 'incomming')
})