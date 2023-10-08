const task = document.querySelectorAll('.task');
const item = document.querySelector('#item');
const toDoBox = document.querySelector('#to-do-box');

const openEditWindow = (editButton) => {
    console.log(editButton);
    const windowClose = document.getElementById('window-close');
    const window = document.querySelector('.edit-window');
    const windowConfirm = document.getElementById('window-confirm');
    const windowInput = document.getElementById('new-task');

    // Showing the window by changing css
    window.classList.remove('close');
    window.classList.add('open');
    
    // Showing previous task value
    document.getElementById('previous-task').innerText = `${editButton.parentNode.querySelector('p').innerText + ' ' + 'id =' + editButton.parentNode.id}`;
    // Clearing the input box every time window is opened. So that user gets refresh input box
    windowInput.value = ``;

    // Closing function for closing the window.
    const close = () => {
        window.classList.remove('open');
        window.classList.add('close');
    }

    // function for changing text of parent node.

    const ChangingTaskToNewTask = () => {
        // setting the Task text to new Task (new value take by window input)
        editButton.parentNode.querySelector('p').innerText = windowInput.value;
    }

    // When the user press enter key after typing , changing the task and closing window
    windowInput.addEventListener('keyup', 
        function(e) {
            if (e.key == 'Enter') {
                ChangingTaskToNewTask();
                close();
            }
        return
    })

    // When cross button is clicked closing the window.
    windowClose.addEventListener('click', () => {
        close();
        return
    });

    // When Confirm button is clicked then changing task to new task and closing the window.
    windowConfirm.addEventListener('click', () => {
        console.log('click captured');
        ChangingTaskToNewTask()
        close();    
        return
    })
    return 
}



// Creating task item with complete, Edit and delete Functionality.
const append = (value) => {

    // Creating task element.
    const li = document.createElement('li');
    li.setAttribute('id', Date.now())
    li.innerHTML = 
        `<p>${value}</p>
        <button>Edit</button> 
        <i>&#x2718;</i>`;   
    toDoBox.append(li);

    // Handling task done event (COMPLETE).
    li.addEventListener(
        'click', () => {
            li.classList.toggle('done');
        }
    )
 
    // Handling Edit button click event (EDIT)
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // will stop bubbling.
        console.log(e.target);
        openEditWindow(e.target);
    })

    // Handling close icon click event (DELETE)

    li.querySelector('i').addEventListener('click', () => {
        console.log('delete')
        li.remove()
    })
}

// this refers to item value.
// Handling Enter event after task is written 
item.addEventListener(
    'keyup', 
    function(e) {
        if (e.key == 'Enter') {
            // adding input value as a new task.
            append(this.value);
            this.value = "";
        }
    }
)











