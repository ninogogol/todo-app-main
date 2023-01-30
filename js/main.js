// Get reference to the text input
const newTodoInput = document.querySelector('#newTodoItem')

// Get reference to the submit checkbox
const submitCheckbox = document.querySelector('#submitCheckbox')

// Get reference to the container element where the to-do items will be displayed
const todoItemsContainer = document.querySelector('.todoItemsContainer')

// Update the item count
const itemCount = document.querySelector('#item-count')

// Get reference to the clear completed button
const clearCompletedBtn = document.querySelector('#clearCompletedBtn')

// Get reference to the filter buttons (All, Active, Completed)
const allItemsBtn = document.querySelector('#allItemsBtn')
const activeItemsBtn = document.querySelector('#activeItemsBtn')
const completedItemsBtn = document.querySelector('#completedItemsBtn')

// Create an empty array to store the new to-do items
const newTodos = []

// Create an array of pre-existing to-do items
const todosArray = [
    {
        text: 'Complete online JavaScript course',
    },
    {
        text: 'Jog around the park 3x',
    },
    {
        text: '10 minutes meditation',
    },
    {
        text: 'Read for 1 hour',
    },
    {
        text: 'Pick up groceries',
    },
    {
        text: 'Complete Todo App on Frontend Mentor',
    }

]

// Loop through the pre-existing to-do items and render each one on the page
todosArray.forEach(todoItem => {
    renderHtmlContent(todoItem)
    newTodos.push(todoItem)
})

// Add an event listener to the submit checkbox to create a new to-do item when checked
submitCheckbox.addEventListener("input", () => {
    submitNewItem()
    showAllItems()
})

// Create a new to-do item when the ENTER key is pressed
newTodoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        submitNewItem()
        showAllItems()
    }
})


// Function to create and submit a new to-do item
function submitNewItem() {
    const newTodoInputValue = document.querySelector('#newTodoItem').value

    // Validate that the input value is not empty
    if(newTodoInputValue === '') {
        alert('Please enter a valid todo item')
        submitCheckbox.checked = false
        return ''
    }

    // Create a new to-do item object
    const newTodoItem = {
        text: newTodoInputValue
    }

    // Render the new to-do item on the page
    renderHtmlContent(newTodoItem)
    
    // Add the new to-do item to the newTodos array
    newTodos.push(newTodoItem)

    // Clear the input field and checkbox
    document.querySelector('#newTodoItem').value = ''
    document.querySelector('#submitCheckbox').checked = false

}


// Renders the HTML content for a single to-do item
function renderHtmlContent(todoItem) {

    const todoItemWrapper = document.createElement('div')
    

    const checkboxAndTextWrapper = document.createElement('div')
    checkboxAndTextWrapper.classList.add('d-flex')

    const checkboxWrapper = document.createElement('div')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')

    const todoText = document.createElement('p')
    todoText.classList.add('todoText')
    todoText.innerText = todoItem.text

    const deleteX = document.createElement('img')
    deleteX.setAttribute('src', 'images/icon-cross.svg')

    todoItemsContainer.prepend(todoItemWrapper)
    todoItemWrapper.append(checkboxAndTextWrapper)
    checkboxAndTextWrapper.append(checkboxWrapper)
    checkboxWrapper.append(checkbox)
    checkboxAndTextWrapper.append(todoText)
    todoItemWrapper.append(deleteX)

    // Add completed style if the to-do item is completed
    if (todoItem.isCompleted) {
        checkbox.checked = true
        if (todoItemsContainer.classList.contains('bg-dark')) {
            todoText.classList.toggle('completed-dark')
        } else {
            todoText.classList.toggle('completed-light')
        }
    }

    // Add border bottom style based on theme
    if (todoItemsContainer.classList.contains('bg-dark')) {
        todoItemWrapper.classList.add('border-bottom-dark', 'todoItemWrapper')
        todoText.classList.add('color-dark')
    } else {
        todoItemWrapper.classList.add('border-bottom-light', 'todoItemWrapper')
        todoText.classList.add('color-light')
    }

    // Add event listener for toggling completion on text click
    todoText.addEventListener("click", () => {

        checkbox.checked = !checkbox.checked

        if (checkbox.checked) {
            if (todoItemsContainer.classList.contains('bg-dark')) {
                todoText.classList.toggle('completed-dark')
                todoText.classList.toggle('completed')
            } else {
                todoText.classList.toggle('completed-light')
                todoText.classList.toggle('completed')
            }
        } else {
            todoText.classList.remove('completed-dark', 'completed-light', 'completed')
        }
    })

    // Add event listener for toggling completion
    checkbox.addEventListener("click", () => {

        if (checkbox.checked) {
            if (todoItemsContainer.classList.contains('bg-dark')) {
                todoText.classList.toggle('completed-dark')
                todoText.classList.toggle('completed')
            } else {
                todoText.classList.toggle('completed-light')
                todoText.classList.toggle('completed')
            }
        } else {
            todoText.classList.remove('completed-dark', 'completed-light', 'completed')
        }
    })

    // Add click event listener to the delete button
    deleteX.addEventListener("click", () => {

        todoItemWrapper.remove()

        const todoItemWrapperCount = document.querySelectorAll('.todoItemWrapper')
        
        // Check if the "Completed" button is active
        if (completedItemsBtn.classList.contains('active')) {
            const completedCount = document.querySelectorAll('.completed')

            // Update the item count display
            itemCount.innerHTML = `${completedCount.length} items left`    
            
            // Check if the "Active" button is active
        } else if (activeItemsBtn.classList.contains('active')) {
            const activeItemsCount = document.querySelectorAll('.todoText:not(.completed)')

            // Update the item count display
            itemCount.innerHTML = `${activeItemsCount.length} items left`
        } else {
            // If neither button is active, show the total count
            itemCount.innerHTML = `${todoItemWrapperCount.length} items left`
        }
    })

    // Initialize the item count display
    itemCount.innerText = `${todosArray.length} items left`

}

// Show all items event handler
function showAllItems() {
    
    const todoItemWrapper = document.querySelectorAll('.todoItemWrapper')

    // Display all todo item wrappers
    todoItemWrapper.forEach(item => {
        item.style.display = null
    })

    itemCount.innerHTML = `${todoItemWrapper.length} items left`

    // Set allItemsBtn to active and remove active status from other buttons
    allItemsBtn.classList.add('active')
    activeItemsBtn.classList.remove('active')
    completedItemsBtn.classList.remove('active')

}

// Add event listener to allItemsBtn to show all items
 allItemsBtn.addEventListener("click", () => {
    showAllItems()
})

// Add event listener to activeItemsBtn to show only active items
activeItemsBtn.addEventListener("click", () => {

    const itemText = document.querySelectorAll('.todoText')

    // Loop through all items and display only active items
    itemText.forEach(item => {
        if (item.classList.contains('completed')) {
            item.parentNode.parentNode.style.display = 'none'
        } else {
            item.parentNode.parentNode.style.display = null
        }
    })

    const activeItemsCount = document.querySelectorAll('.todoText:not(.completed)')
    
    // Update item count with number of active items
    itemCount.innerHTML = `${activeItemsCount.length} items left`

    // Set activeItemsBtn to active and remove active status from other buttons
    activeItemsBtn.classList.add('active')
    allItemsBtn.classList.remove('active')
    completedItemsBtn.classList.remove('active')

})

// Add event listener to completedItemsBtn to show only completed items
completedItemsBtn.addEventListener("click", () => {

    const itemText = document.querySelectorAll('.todoText')

    // Loop through all items and display only completed items
    itemText.forEach(item => {
        if (!item.classList.contains('completed')) {
            item.parentNode.parentNode.style.display = 'none'
        } else {
            item.parentNode.parentNode.style.display = null
        }
    })

    const completedCount = document.querySelectorAll('.completed')

    // Update item count with number of active items
    itemCount.innerHTML = `${completedCount.length} items left`

    // Set completedItemsBtn to active and remove active status from other buttons
    completedItemsBtn.classList.add('active')
    activeItemsBtn.classList.remove('active')
    allItemsBtn.classList.remove('active')

})

//Event Listener for Clear Completed button
clearCompletedBtn.addEventListener("click", () => {

    const itemText = document.querySelectorAll('.todoText')

    itemText.forEach(item => {
        if(item.classList.contains('completed')) {
            item.parentNode.parentNode.remove()
        }
        
    })

    showAllItems()

})



// EventListeners to switch to light or dark mode

// Get the icon for switching to dark mode
const iconMoon = document.querySelector('.icon-light')

// Get the icon for switching to light mode
const iconSun = document.querySelector('.icon-dark')

// Add event listener to the icon-light
// Switch the classes of the light mode elements to dark mode
iconMoon.addEventListener("click", () => {
    iconMoon.style.display = 'none'
    iconSun.style.display = 'block'

    document.querySelector('.main-bg-light').classList.toggle('main-bg-dark', true)
    document.querySelector('.bg-image-light').classList.toggle('bg-image-dark', true)

    document.querySelectorAll('.border-bottom-light').forEach(item => {
        item.classList.toggle('border-bottom-dark', true)
    })

    document.querySelectorAll('.bg-light').forEach(item => {
        item.classList.toggle('bg-dark', true)
    })

    document.querySelectorAll('.color-light').forEach(item => {
        item.classList.toggle('color-dark', true)
    })

    document.querySelectorAll('.completed-light').forEach(item => {
        item.classList.toggle('completed-dark', true)
    })

    document.querySelectorAll('.footer-light').forEach(item => {
        item.classList.toggle('footer-dark', true)
    })

    document.querySelectorAll('.filter-button-light').forEach(item => {
        item.classList.toggle('filter-button-dark', true)
    })
})


// Add event listener to the icon-light
// Switch the classes of the dark mode elements to light mode
iconSun.addEventListener("click", () => {
    iconSun.style.display = 'none'
    iconMoon.style.display = 'block'

    document.querySelector('.main-bg-light').classList.toggle('main-bg-dark', false)
    document.querySelector('.bg-image-light').classList.toggle('bg-image-dark', false)


    document.querySelectorAll('.bg-light').forEach(item => {
        item.classList.toggle('bg-dark', false)
    })

    document.querySelectorAll('.color-light').forEach(item => {
        item.classList.toggle('color-dark', false)
    })

    document.querySelectorAll('.completed-light').forEach(item => {
        item.classList.toggle('completed-dark', false)
    })

    document.querySelectorAll('.footer-light').forEach(item => {
        item.classList.toggle('footer-dark', false)
    })

    document.querySelectorAll('.filter-button-light').forEach(item => {
        item.classList.toggle('filter-button-dark', false)
    })

    document.querySelectorAll('.border-bottom-light').forEach(item => {
        item.classList.toggle('border-bottom-dark', false)
    })

})


// This line initializes the Sortable library on the todoItemsContainer element.
// The animation option is set to 300 milliseconds for a smoother sorting experience.
new Sortable(todoItemsContainer, {
    animation: 300
})