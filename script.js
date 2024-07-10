document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterAll = document.getElementById('filter-all');
    const filterPending = document.getElementById('filter-pending');
    const filterCompleted = document.getElementById('filter-completed');
    let tasks = [];
  
    const renderTasks = (filter = 'all') => {
      taskList.innerHTML = '';
      let filteredTasks = tasks;
      if (filter === 'pending') {
        filteredTasks = tasks.filter(task => task.status === 'pending');
      } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.status === 'completed');
      }
  
      filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.status === 'completed') {
          taskItem.classList.add('complete');
        }
        taskItem.dataset.id = task.id;
        taskItem.innerHTML = `
          <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
          </div>
          <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="complete">${task.status === 'pending' ? 'Complete' : 'Revert'}</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    };
  
    const addTask = (task) => {
      tasks.push(task);
      renderTasks();
    };
  
    const editTask = (id, updatedTask) => {
      tasks = tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task);
      renderTasks();
    };
  
    const deleteTask = (id) => {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    };
  
    const toggleTaskStatus = (id) => {
      tasks = tasks.map(task => task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task);
      renderTasks();
    };
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const status = document.getElementById('status').value;
      const task = {
        id: Date.now().toString(),
        title,
        description,
        status
      };
      addTask(task);
      taskForm.reset();
    });
  
    taskList.addEventListener('click', (e) => {
      const target = e.target;
      const taskItem = target.closest('.task-item');
      const taskId = taskItem.dataset.id;
      if (target.classList.contains('edit')) {
        const title = taskItem.querySelector('h3').innerText;
        const description = taskItem.querySelector('p').innerText;
        document.getElementById('title').value = title;
        document.getElementById('description').value = description;
        document.getElementById('status').value = tasks.find(task => task.id === taskId).status;
        deleteTask(taskId);
      } else if (target.classList.contains('delete')) {
        deleteTask(taskId);
      } else if (target.classList.contains('complete')) {
        toggleTaskStatus(taskId);
      }
    });
  
    filterAll.addEventListener('click', () => renderTasks('all'));
    filterPending.addEventListener('click', () => renderTasks('pending'));
    filterCompleted.addEventListener('click', () => renderTasks('completed'));
  });
  