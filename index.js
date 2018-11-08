//constants
let localBooks
const showPanel = document.querySelector('#show-panel')
const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')

//fetchers

const fetchBooks = () => fetch('http://localhost:3000/books').then(resp=>{

return resp.json() })


const fetchUsers = () =>  fetch('http://localhost:3000/users').then(resp=>resp.json())


//shovers

const shoveBooks = books => books.forEach(book => shoveBook(book))


const shoveBook = book => {
    const bookEl = document.createElement('li')
    bookEl.innerHTML = `${book.title}`

    bookListener(bookEl,book)

    listPanel.appendChild(bookEl)
}


fetchBooks().then(books => {
    localBooks = books
    shoveBooks(books)
})





//eventListeners

const bookListener = (bookEl,book) => {
    
    bookEl.addEventListener('click', () => {
        const readUsers = book.users.map(user=>
            `<li data-id='${user.id}'>` + user.username + '</li>')
        
        const userPanel = document.createElement('div')
        userPanel.setAttribute('class','usersDiv')
        // showPanel.innerHTML=''
        showPanel.innerHTML=
        `<h2>${book.title}</h2>
        <img src=${book.img_url} alt="">
        <p>${book.description}</p>
        `
        userPanel.innerHTML=`
        <p>${readUsers.join('')}</p>
        <button id='liked-button'>Read book</button> 
        `
        showPanel.appendChild(userPanel)
    })
}



const likedListener = (readButton,book) => {
    readButton.addEventListener('click', () => {
        
        // change locally
        // change on JSON
        // change on page





    })
}

