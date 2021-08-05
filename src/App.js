import { useState } from 'react'
import { FaCommentsDollar } from 'react-icons/fa'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

var executedFetch = false;

function App() {
  
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  const fetchTasks = () => {
      fetch('http://127.0.0.1:8000/api/task-list')
      .then(response => response.json())
      .then(data => setTasks(data))
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const addTask = (task) => {
    var csrfToken = getCookie('csrftoken')
    var url = 'http://127.0.0.1:8000/api/task-create';
    console.log(task)
    console.log(JSON.stringify(task))
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'X-CSRFToken' : csrfToken,
      },
      
      body: JSON.stringify(task)
    }).then((response) => fetchTasks())
  }

  const deleteTask = (id) => {
    var csrfToken = getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/task-delete/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'X-CSRFToken' : csrfToken,
      },
    }).then((response) => fetchTasks())
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchTasks()
  })

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      { showAddTask && <AddTask onAdd={addTask} /> }
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : 'No Tasks'}
    </div>
  );
}

export default App;
