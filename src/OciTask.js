import './OciTask.css';

export const OciTask = ({handleCloseOciTask, showOciTask, isEditTask, selectedTask}) => {
    const showHideClassName = showOciTask ? "modal display-block" : "modal display-none";

    var modifiedTask = {}
    if(selectedTask !== undefined) {
        modifiedTask.id = selectedTask.id;
        modifiedTask.title = selectedTask.title;
        modifiedTask.priority = selectedTask.priority;
        modifiedTask.completed = selectedTask.completed;
        modifiedTask.description = selectedTask.description !== null ?  selectedTask.description : "";
        modifiedTask.startDate = selectedTask.startDate !== null ? selectedTask.startDate.substring(0,10) : "";
        modifiedTask.dueDate = selectedTask.dueDate !== null ? selectedTask.dueDate.substring(0,10) : "";
    }

    const updateTitle = (title) => {
        modifiedTask.title = title.target.value !== null ? title.target.value : "";
    }

    const updateDescription = (description) => {
        modifiedTask.description = description.target.value !== null ? description.target.value : "";
    }

    const updatePriority = (priority) => {
        modifiedTask.priority = parseInt(priority.target.value);
    }

    const updateStartDate = (startDate) => {
        modifiedTask.startDate = startDate.target.value !== null ? startDate.target.value : "";
    }

    const updateDueDate = (dueDate) => {
        modifiedTask.dueDate = dueDate.target.value !== null ? dueDate.target.value : "";
    }

    const updateCompleted = (completed) => {
        modifiedTask.completed = completed.target.checked;
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <h3>{isEditTask === true ? "Edit OCI Task" : "Add OCI Task"}</h3>
                </div>
                <div key={modifiedTask.title !== undefined && modifiedTask.title !== null ? "title" + modifiedTask.title : "Enter Title"}>
                    <label for="title">Title:</label>
                    <input name="title" defaultValue={modifiedTask.title !== undefined && modifiedTask.title !== null ? modifiedTask.title : "Enter Title"} onChange={(val) => updateTitle(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div key={modifiedTask.description !== undefined && modifiedTask.description !== null ? "description" + modifiedTask.description : "Enter Description"}>
                    <label for="description">Description:</label>
                    <input name="description" defaultValue={modifiedTask.description !== undefined && modifiedTask.description !== null ? modifiedTask.description : "Enter Description"} onChange={(val) => updateDescription(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div key={modifiedTask.priority !== undefined && modifiedTask.priority !== null ? "priority" + modifiedTask.priority.toString() : "Enter Priority"}>
                    <label for="priority">Priority:</label>
                    <input name="priority" defaultValue={modifiedTask.priority !== undefined && modifiedTask.priority !== null ? modifiedTask.priority.toString() : "Enter Priority"} onChange={(val) => updatePriority(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div key={modifiedTask.startDate !== undefined && modifiedTask.startDate !== null ? "startDate" + modifiedTask.startDate.substring(0,10) : "Enter Start Date yyyy-mm-dd"}>
                    <label for="startDate">Start Date:</label>
                    <input name="startDate" defaultValue={modifiedTask.startDate !== undefined && modifiedTask.startDate !== null ? modifiedTask.startDate.substring(0,10) : "Enter Start Date yyyy-mm-dd"} onChange={(val) => updateStartDate(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div key={modifiedTask.dueDate !== undefined && modifiedTask.dueDate !== null ? "dueDate" + modifiedTask.dueDate.substring(0,10) : "Enter Due Date yyyy-mm-dd"}>
                    <label for="dueDate">Due Date:</label>
                    <input name="dueDate" defaultValue={modifiedTask.dueDate !== undefined && modifiedTask.dueDate !== null ? modifiedTask.dueDate.substring(0,10) : "Enter Due Date yyyy-mm-dd"} onChange={(val) => updateDueDate(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div key={modifiedTask.completed !== undefined && modifiedTask.completed !== null ? "completed" + (modifiedTask.completed === true) ? "Yes" : "No" : "No"}>
                    <label for="completed">Completed:</label>
                    <input type="checkbox" name="completed" defaultChecked={modifiedTask.completed !== undefined && modifiedTask.completed !== null ? modifiedTask.completed : false} onChange={(val) => updateCompleted(val)}/>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div>
                    <button type="button" onClick={() => handleCloseOciTask(isEditTask, true, modifiedTask)}>
                        Submit
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={() => handleCloseOciTask(isEditTask, false, undefined)}>
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
}
