// const socket=io('http://localhost:8000');
const socket=io('https://chat-app-socket.vercel.app/');

const form=document.getElementById('send-cont');
const messageInput=document.getElementById('msgsend');
const messageContainer=document.querySelector('.container')


form.addEventListener('submit',e=>{
    e.preventDefault();
    
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send-message',message);
    messageInput.value='';

})

const append=(message,position)=>{
    
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageElement.style.color='green';

}


const leave=(message,position)=>{
    
    const messageElement=document.createElement('div');

    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageElement.style.color='Red';

}

const name=prompt('Please Enter Your Name');

if (name) socket.emit('new-user-joined', name);
else window.location.href='/';

socket.on('user-joined',name=>{
    append(`${name} Joined the Chat`,'center');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('user-left',name=>{
    leave(`${name} Left the Chat`,'center');
}
)