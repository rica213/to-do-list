/* eslint-disable no-underscore-dangle */
import './style.css';
import currentTasks from './modules/tasks';
import add from './modules/add.js';
import { addBtn, newTask, tasksContainer } from './modules/taskElements.js';
import { save, retrieve } from './modules/localeStorage.js';

//add new task

newTask.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const task = add(e);
    currentTasks.add(task);
    save();
    currentTasks.display();
    console.log(currentTasks._tasks);
  }
});

addBtn.addEventListener('click', (e) => {
  const task = add(e);
  currentTasks.add(task);
  save();
  currentTasks.display();
  console.log(currentTasks._tasks);
});


  tasksContainer.addEventListener('keypress', function (e) {
    if (e.target.className === 'description' && e.key === 'Enter') {
      if(e.target.textContent){
        e.preventDefault();
        currentTasks.update(e.target.textContent, e.target.parentElement.id);
        save();
      } else {
        e.preventDefault();
      }
    }
  });

  tasksContainer.addEventListener('change', function (e) {
    let desc = currentTasks._tasks[e.target.parentElement.id]._description; //not striked
    if(e.target.type==='checkbox'){
      if(e.target.checked) {
        currentTasks._tasks[e.target.parentElement.id]._completed = true;
        e.target.nextElementSibling.innerHTML = `<strike>${desc}</strike>`;
        currentTasks._tasks[e.target.parentElement.id]._description = `<strike>${desc}</strike>`;
        save();
      } else {
        currentTasks._tasks[e.target.parentElement.id]._completed = false;
        desc = e.target.nextElementSibling.innerHTML.replaceAll(/(<strike>|<\/strike>)/g, '');
        e.target.nextElementSibling.innerHTML = desc;
        currentTasks._tasks[e.target.parentElement.id]._description = desc;
        save();
      }
    } else {
      e.preventDefault();
    }
  });

window.addEventListener('load', () => {
  retrieve();
  currentTasks.display();
});
