const addQuote = document.querySelector('#quoteInput')
const addQuoteForm = document.querySelector('#quoteInputForm')
const quoteDropdown = document.getElementsByName('quote')
const editQuote = document.querySelector('#quoteEdit')
const editedQuote = document.querySelector('#editedQuote')
const editQuoteForm = document.querySelector('#quoteEditForm')
const deleteQuote = document.querySelector('#quoteDelete')
const deleteQuoteForm = document.querySelector('#quoteDeleteForm')
const quoteList = document.querySelector('#quoteSection')

const inputQuote = event => {
    event.preventDefault()
    let newQuote = {
        quote: addQuote.value
    }
    axios.post(`/api/quote/`, newQuote)
    .then(res => {
        console.log(res.data);
        getQuotes()
    })
    addQuote.value = ''
}

const changeQuote = event => {
    event.preventDefault()
    if (+editQuote.value > 0) {
        let newQuote = {
            id: +editQuote.value,
            quote: editedQuote.value
        }
        axios.put(`/api/quote/${newQuote.id}`, newQuote)
        .then(res => {
            console.log(res.data);
            getQuotes()
        })
    } else {
        alert('Please select a quote')
    }
    editedQuote.value = ''
}

const removeQuote = event => {
    event.preventDefault()
    if (+deleteQuote.value > 0) {
        let id = +deleteQuote.value
        axios.delete(`/api/quote/${id}`)
        .then(res => {
            console.log(res.data);
            getQuotes()
        })
    } else {
        alert('Please select a quote')
    }
}
const getQuotes = () => {
    
    axios.get(`/api/quote`)
    .then(res => {
        for (x = 0; x < quoteDropdown.length; x++) {
            quoteDropdown[x].innerHTML = ''
            let nullOption = document.createElement('option')
            nullOption.value = 0
            nullOption.text = 'Select quote'
            quoteDropdown[x].appendChild(nullOption)
        }
        quoteList.innerHTML = '';
        for(i = 0; i < res.data.length; i++) {
            let addedQuote = document.createElement('h3')
            addedQuote.textContent = `"${res.data[i].quote}"`
            quoteList.appendChild(addedQuote)
            for(j = 0; j < quoteDropdown.length; j++) {
                let addedQuoteDropdown = document.createElement('option')
                addedQuoteDropdown.value = +res.data[i].id
                if (res.data[i].quote.length > 20) {
                    addedQuoteDropdown.text = res.data[i].quote.slice(0, 20) + '...'
                } else {
                    addedQuoteDropdown.text = res.data[i].quote
                }
                quoteDropdown[j].appendChild(addedQuoteDropdown, 0)
            }
        }
    }) 
}

addQuoteForm.addEventListener('submit', inputQuote)
editQuoteForm.addEventListener('submit', changeQuote)
deleteQuoteForm.addEventListener('submit', removeQuote)

getQuotes()