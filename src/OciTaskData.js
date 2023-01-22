import axios from "axios";

const baseUrl = 'http://138.2.233.236:8080/application/v1/ocitaskrestservice';

export function LoadTasks(setData, setError) {

    let restClient = axios.create({headers: {'Access-Control-Allow-Origin': '*'}});

    const sendGetRequest = async () => {
        restClient.get(baseUrl + '/tasks', {
            headers: {
                'Accept': 'application/json'
            }}).then(resp => {
                setData(resp.data.tasks);
            }).catch(err => {
                setError(err);
            });
    }

    sendGetRequest();
}

export function DeleteTask(taskId, handleDeleteTask, showDeleteError) {

    let restClient = axios.create({headers: {'Access-Control-Allow-Origin': '*'}});

    const sendDeteleRequest = async () => {
        restClient.delete(baseUrl + '/tasks/' + taskId, {
            headers: {
                'Accept': 'application/json'
            }}).then(resp => {
                handleDeleteTask(taskId);
            }).catch(err => {
                showDeleteError(err);
            });
    }

    sendDeteleRequest();
}

export function UpdateTask(taskId, task, handleUpdateTask, showUpdateError) {

    let restClient = axios.create({headers: {'Access-Control-Allow-Origin': '*'}});

    var newTask = {};
    newTask.id = task.id;
    newTask.title = task.title;
    newTask.description = task.description;
    newTask.priority = task.priority;
    newTask.startDate = task.startDate;
    newTask.dueDate = task.dueDate;
    newTask.completed = task.completed;

    const sendPutRequest = async () => {
        restClient.put(baseUrl + '/tasks/' + taskId, newTask, {
            headers: {
                'Accept': 'application/json'
            }}).then(resp => {
                handleUpdateTask(resp.data.taskId, task);
            }).catch(err => {
                showUpdateError(err);
            });
    }

    sendPutRequest();
}

export function CreateTask(task, handleCreateTask, showCreateError) {

    let restClient = axios.create({headers: {'Access-Control-Allow-Origin': '*'}});

    var newTask = {};
    newTask.title = task.title;
    newTask.description = task.description;
    newTask.priority = task.priority;
    newTask.startDate = task.startDate;
    newTask.dueDate = task.dueDate;
    newTask.completed = task.completed;

    const sendPostRequest = async () => {
        restClient.post(baseUrl + '/tasks', newTask, {
            headers: {
                'Accept': 'application/json'
            }}).then(resp => {
                handleCreateTask(resp.data.taskId, task);
            }).catch(err => {
                showCreateError(err);
            });
    }

    sendPostRequest();
}
