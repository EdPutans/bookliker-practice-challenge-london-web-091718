//constants
let localBooks
const showPanel = document.querySelector('#show-panel')
const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
let currentUser = {'id': 1, 'username': 'Ed'}


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
            `<div><li data-id='${user.id}'>` + user.username + '</li></div>')
        
        const userPanel = document.createElement('div')
        userPanel.setAttribute('class','userPanel')
       
        showPanel.innerHTML =
        `<h2>${book.title}</h2>
        <img src=${book.img_url}>
        <p>${book.description}</p>
        <button id='liked-button'>Read book</button> `

        userPanel.innerHTML=`
        ${readUsers.join('')}
        `

        readButton = showPanel.querySelector('#liked-button')

        readButton.addEventListener('click', () => 
        { likedListener(userPanel,book) }
        ) 

        showPanel.appendChild(userPanel)
    })
}



const likedListener = (userPanel, book) => {
    if (userPanel.innerHTML.includes(currentUser.username)){
        alert('You have already liked the book!')
    } else {

        // // change locally => attempt to add locally creates 2 copies of the book on the page
        // currentBookIndex = localBooks.findIndex(locatedBook => locatedBook.id == book.id)
        // currentBook = localBooks[currentBookIndex]
        // currentBook.users.push(currentUser)
        // console.log('added user, now there are: ', currentBook.users)

       // change on page
        userEl=document.createElement('li')
        userEl.setAttribute(`data-id`,currentUser.id)
        userEl.innerText = currentUser.username
        // userEl.innerHTML = `<li data-id='${currentUser.id}'>` + currentUser.username + '</li>'
        userPanel.appendChild(userEl)
        
        // change on JSON
        book.users.push(currentUser)
        fetch(`http://localhost:3000/books/${book.id}`,
        {   method: "PATCH",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }
        ).then(console.log('updated!'))
        

        //update locally
        fetchBooks().then(books => {
            localBooks = books})
    }

}



const updateDatabase = (book) => {   }
const updateLocally = (book) => {    }
const updateOnPage = (userPanel,book) => {     }