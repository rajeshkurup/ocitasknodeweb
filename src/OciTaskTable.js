import React from 'react';
import {LoadTasks, DeleteTask, UpdateTask, CreateTask} from './OciTaskData.js';
import {OciTask} from './OciTask.js';
import _ from "lodash";

export default class OciTaskTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: props.tasks,
            error: undefined,
            showOciTask: false
        }
        this.isEditTask = false
        this.selectedTask = undefined
    }

    setShowOciTask = (isEdit, selectedTask) => {
        if(this.state.showOciTask !== true) {
            this.isEditTask = isEdit;
            this.selectedTask = selectedTask;
            this.setState({showOciTask: true});
        }
    };
    
    setHideOciTask = (isEdit, isSubmit, newTask) => {
        if(this.state.showOciTask !== false) {
            if(isSubmit === true) {
                if(isEdit === true) {
                    UpdateTask(newTask.id, newTask, this.handleUpdateTask, this.showUpdateError);
                }
                else {
                    CreateTask(newTask, this.handleCreateTask, this.showCreateError);
                }
            }

            this.isEditTask = false
            this.selectedTask = undefined
            this.setState({showOciTask: false});
        }
    };

    handleUpdateTask = (taskId, newTask) => {
        if(this.state.tasks !== undefined) {
            var tasks = _.cloneDeep(this.state.tasks);
            var isUpdated = false;

            for(var taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
                if(tasks[taskIdx].id === taskId) {
                    tasks[taskIdx].id = taskId;
                    tasks[taskIdx].title = newTask.title;
                    tasks[taskIdx].description = newTask.description;
                    tasks[taskIdx].priority = newTask.priority;
                    tasks[taskIdx].startDate = newTask.startDate;
                    tasks[taskIdx].dueDate = newTask.dueDate;
                    tasks[taskIdx].completed = newTask.completed;
                    isUpdated = true;
                    break;
                }
            }

            if(isUpdated === true) {
                this.setState({tasks: tasks});
            }
        }
    }

    handleCreateTask = (taskId, newTask) => {
        if(this.state.tasks !== undefined) {
            var task = {}
            task.id = taskId;
            task.title = newTask.title;
            task.description = newTask.description;
            task.priority = newTask.priority;
            task.startDate = newTask.startDate;
            task.dueDate = newTask.dueDate;
            task.completed = newTask.completed;

            var tasks = _.cloneDeep(this.state.tasks);
            tasks.push(task);

            this.setState({tasks: tasks});
        }
    }

    setData = (tasks) => {
        this.setState({tasks: tasks});
    }

    setError = (error) => {
        this.setState({error: error});
    }

    componentDidMount() {
        LoadTasks(this.setData, this.setError);
    }

    deleteTask = (taskId) => {
        DeleteTask(taskId, this.handleDeleteTask, this.showDeleteError);
    }

    handleDeleteTask = (taskId) => {
        if(this.state.tasks !== undefined) {
            var tasks = _.cloneDeep(this.state.tasks);
            var isDeleted = false;

            for(var taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
                if(tasks[taskIdx].id === taskId) {
                    tasks.splice(taskIdx, 1);
                    isDeleted = true;
                    break;
                }
            }

            if(isDeleted === true) {
                this.setState({tasks: tasks});
            }
        }
    }

    showDeleteError = (error) => {
        alert("Failed to Delete Task! Error=" + error);
    }

    showUpdateError = (error) => {
        alert("Failed to Update Task! Error=" + error);
    }

    showCreateError = (error) => {
        alert("Failed to Create Task! Error=" + error);
    }
  
    render() {
        if(this.state.error === undefined) {
            if(this.state.tasks !== undefined && this.state.tasks.length > 0) {
                const tasks = this.state.tasks;

                var tableStyle = {
                    "border": "3px solid black",
                    "textAlign": "center",
                    "border-collapse": "collapse",
                    "table-layout": "fixed",
                    "font-family": "arial, sans-serif"
                };

                var cellStyle = {
                    "border": "1px solid black",
                    "text-align": "center",
                    "padding": "8px"
                };

                return (
                    <div>
                        <div>
                            <h3>OCI Tasks</h3>
                        </div>
                        <div>
                            <button onClick={() => this.setShowOciTask(false, undefined)}>Add Task</button>
                        </div>
                        <div>
                            <OciTask showOciTask={this.state.showOciTask} handleCloseOciTask={this.setHideOciTask} isEditTask={this.isEditTask} selectedTask={this.selectedTask}/>
                        </div>
                        <div>
                            <table style={tableStyle}>
                                <tr style={cellStyle} key={"header"}>
                                    <th style={cellStyle}>Title</th>
                                    <th style={cellStyle}>Description</th>
                                    <th style={cellStyle}>Priority</th>
                                    <th style={cellStyle}>Start Date</th>
                                    <th style={cellStyle}>Due Date</th>
                                    <th style={cellStyle}>Completed</th>
                                    <th style={cellStyle}/>
                                    <th style={cellStyle}/>
                                </tr>
                                {tasks.map((item) => (
                                    <tr style={cellStyle} key={item.id}>
                                        <td style={cellStyle}>{item.title}</td>
                                        <td style={cellStyle}>{item.description !== undefined && item.description !== null ? item.description : ""}</td>
                                        <td style={cellStyle}>{item.priority !== undefined && item.priority !== null && item.priority !== "" ? item.priority : "0"}</td>
                                        <td style={cellStyle}>{item.startDate !== undefined && item.startDate !== null && item.startDate !== "" ? new Date(item.startDate).toISOString().substring(0,10) : ""}</td>
                                        <td style={cellStyle}>{item.dueDate !== undefined && item.dueDate !== null && item.dueDate !== "" ? new Date(item.dueDate).toISOString().substring(0,10) : ""}</td>
                                        <td style={cellStyle}>{item.completed ? "Yes" : "No"}</td>
                                        <td style={cellStyle}>
                                            <div>
                                                <button onClick={() => this.setShowOciTask(true, item)}>Edit</button>
                                            </div>
                                        </td>
                                        <td style={cellStyle}>
                                            <div>
                                                <button onClick={() => this.deleteTask(item.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h3>OCI Tasks</h3>
                        <a>
                            Loading...
                        </a>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    <h3>OCI Tasks</h3>
                    <a>
                        {this.state.error}
                    </a>
                </div>
            );
        }
    }
}
