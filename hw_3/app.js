"use strict";

var listElement = document.querySelector('.list');
listElement.addEventListener('click', onListClick);
var itemElementList = listElement.children;

var inputElement = document.querySelector('.add-task__input');
inputElement.addEventListener('keydown', onInputKeydown);

var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

var statisticsTotal = document.querySelector('.statistic__total');
var statisticsDone = document.querySelector('.statistic__done');
var statisticsLeft = document.querySelector('.statistic__left');

defineStatistics();

// сформируем задачки
var todoList = [
    {
        name: 'Позвонить в сервис',
        status: 'todo'
    },
    {
        name: 'Купить хлеб',
        status: 'done'
    },
    {
        name: 'Захватить мир',
        status: 'todo'
    },
    {
        name: 'Добавить тудушку в список',
        status: 'todo'
    }
];

// функция по генерации элементов
function addTodoFromTemplate(todo) {
    var newElement = templateContainer.querySelector('.task').cloneNode(true);
    newElement.querySelector('.task__name').textContent = todo.name;
    setTodoStatusClassName(newElement, todo.status === 'todo');
    appendStatistics(todo.status === "todo");
    return newElement;
}

function setTodoStatusClassName(todo, flag) {
    todo.classList.toggle('task_todo', flag);
    todo.classList.toggle('task_done', !flag);
}

function onListClick(event) {
    var target = event.target;
    var element;

    if (isStatusBtn(target)) {
        element = target.parentNode;
        changeTodoStatus(element);
    }

    if (isDeleteBtn(target)) {
        element = target.parentNode;
        deleteTodo(element);
    }
}

function isStatusBtn(target) {
    return target.classList.contains('task__status');
}

function isDeleteBtn(target) {
    return target.classList.contains('task__delete-button');
}

function changeTodoStatus(element) {
    var isTodo = element.classList.contains('task_todo');
    setTodoStatusClassName(element, !isTodo);
    changeStatistics(!isTodo);
}

function deleteTodo(element) {
    listElement.removeChild(element);
    var isTodo = element.classList.contains('task_todo');
    decreaseStatistics(isTodo);
}

function onInputKeydown(event) {
    if (event.keyCode !== 13) {
        return;
    }

    var ENTER_KEYCODE = 13;
    if (event.keyCode !== ENTER_KEYCODE) {
        return;
    }

    var todoName = inputElement.value.trim();

    if (todoName.length === 0 || checkIfTodoAlreadyExists(todoName)) {
        return;
    }

    var todo = createNewTodo(todoName);
    insertTodoElement(addTodoFromTemplate(todo));
    inputElement.value = '';
}

function checkIfTodoAlreadyExists(todoName) {
    var todoElements = listElement.querySelectorAll('.task__name');
    var namesList = Array.prototype.map.call(todoElements, function (element) {
        return element.textContent;
    });
    return namesList.indexOf(todoName) > -1;
}

function createNewTodo(name) {
    return {
        name: name,
        status: 'todo'
    }
}

todoList
    .map(addTodoFromTemplate)
    .forEach(insertTodoElement);

function insertTodoElement(elem) {
    if (listElement.children) {
        listElement.insertBefore(elem, listElement.firstElementChild);
    } else {
        listElement.appendChild(elem);
    }
}

function defineStatistics() {
    statisticsTotal.textContent = '0';
    statisticsDone.textContent = '0';
    statisticsLeft.textContent = '0';
}

function changeStatistics(flag) {
    if(flag) {
        statisticsLeft.textContent = +statisticsLeft.textContent + 1;
        statisticsDone.textContent = +statisticsDone.textContent - 1;
    } else {
        statisticsLeft.textContent = +statisticsLeft.textContent - 1;
        statisticsDone.textContent = +statisticsDone.textContent + 1;
    }
}

function decreaseStatistics(flag) {
    if (flag) {
        statisticsLeft.textContent = +statisticsLeft.textContent - 1;
        statisticsTotal.textContent = +statisticsTotal.textContent - 1;
    } else {
        statisticsDone.textContent = +statisticsDone.textContent - 1;
        statisticsTotal.textContent = +statisticsTotal.textContent - 1;
    }
}

function appendStatistics(flag) {
    if (flag) {
        statisticsLeft.textContent = +statisticsLeft.textContent + 1;
        statisticsTotal.textContent = +statisticsTotal.textContent + 1;
    } else {
        statisticsDone.textContent = +statisticsDone.textContent + 1;
        statisticsTotal.textContent = +statisticsTotal.textContent + 1;
    }
}

var filterValues = {
    ALL: 'all',
    DONE: 'done',
    TODO: 'todo'
};

var selectedFilter = filterValues.ALL;

var filtersElement = document.querySelector('.filters');
filtersElement.addEventListener('click', onFiltersClick);

function onFiltersClick(event) {
    var target = event.target;
    if (!target.classList.contains('filters__item')) {
        return;
    }
    var value = target.dataset.filter;
    if (value === selectedFilter) {
        return;
    }
    filtersElement.querySelector('.filters__item_selected').classList.remove('filters__item_selected');
    target.classList.add('filters__item_selected');
    selectedFilter = value;
    renderFilteredList();
}

function renderFilteredList() {
    var filteredList;
    switch (selectedFilter) {
        case filterValues.DONE:
            filteredList = todoList.filter(function (task) {
                return task.status === 'done';
            });
            break;
        case filterValues.TODO:
            filteredList = todoList.filter(function (task) {
                return task.status === 'todo';
            });
            break;
        default:
            filteredList = todoList;
            break;
    }
    listElement.innerHTML = '';
    filteredList.forEach(insertTodoElement);
}
