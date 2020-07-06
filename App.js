import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <PageTitle />
      <PageTasks /> 
    </div>
  );
}

export default App;

//class page title
class PageTitle extends React.Component{
  render(){
    return (
      <div id="page-title">
        <h2>To Do List</h2>
        <p>{new Date().getFullYear() + "-" + (new Date().getMonth() + 1 ) + "-" + new Date().getDate()}</p>
      </div>
    )
  }
}

//add a new task
class AddNewTask extends React.Component{
  constructor(){
    super();
    this.state={
      text: ""
    }
    this.InputChange = this.InputChange.bind(this);
    this.SubmitNewTask = this.SubmitNewTask.bind(this);
  }

  InputChange(event){
    this.setState({text: event.target.value});
  }

  SubmitNewTask(event){
    this.props.GetNewTask(this.state.text);
    this.setState({text: ""});
  }


  render(){
    return (
      <div id="add-new-task">
        <span className="add-new-task-items">Add a new Task:</span>
        <input placeholder="Type something about your new task..." className="add-new-task-items" onChange={this.InputChange} value={this.state.text}/> 
        <button className="add-new-task-items" onClick={this.SubmitNewTask}>Add</button>
      </div>
      )
  }
}

//task div
class PageTasks extends React.Component{
  constructor(){
    super();
    this.state={
      totalTasks:[]
    }

    this.AddNewTaskItem = this.AddNewTaskItem.bind(this);
    this.SetTaskAsDone = this.SetTaskAsDone.bind(this);
  }

  AddNewTaskItem(text){
    let newTaskList = this.state.totalTasks.reduce(function(arr, item){
      if(arr[0].Content === item.Content){
        arr[0].State = item.State === "Done" ? "Done" : "New";//if this task exists, do not change its state
        return [].concat(arr);
      }else{
        return [].concat(arr, [item]);
      }
    }, [{Content: text, State: "New"}]);
    this.setState({totalTasks: newTaskList});
  }  

  SetTaskAsDone(text){
    let updateTaskStateToDone = this.state.totalTasks.reduce(function(arr, task){
      if(arr[0].Content === task.Content){
        return [].concat(arr);
      }else{
        return [].concat(arr, [task]);
      }
    }, [{Content: text, State: "Done"}]);

    this.setState({totalTasks: updateTaskStateToDone});
  }

  render(){
    const doneTaskCount = this.state.totalTasks.reduce(function(count, task){
      if(task.State === "Done"){
        count++;
      }
      return count;
    }, 0)
    const taskFinishRate = Math.round(doneTaskCount/(this.state.totalTasks.length) * 10000) / 100 + "%";

    return (
      <div>
        <AddNewTask GetNewTask={this.AddNewTaskItem}/>
        <div>
          {this.state.totalTasks.length > 0 && <h4>All tasks: (Task finish rate: <span>{taskFinishRate}</span>)</h4>}
          <DisplayAllTasks TaskList={this.state.totalTasks} SetTaskDone={this.SetTaskAsDone} />
        </div>
      </div>
    );
  }
}

//show all tasks 
class DisplayAllTasks extends React.Component{
  render(){
    const newTaskItems=[];
    const doneTaskItems=[];
    this.props.TaskList.forEach(item =>{
      item.State === "New" 
      ? newTaskItems.push(<TaskItem content={item.Content} key={item.Content} state={item.State} SetTaskDone={() => this.props.SetTaskDone(item.Content)} />) 
      : doneTaskItems.push(<TaskItem content={item.Content} key={item.Content} state={item.State} />);
    });

    return (
      <div id="display-all-tasks">
        {
          newTaskItems.length > 0 && 
          <div>
            <h5>New tasks:</h5>
            <ul>
              {newTaskItems}
            </ul>
          </div>
        }  
        {
          doneTaskItems.length > 0 && 
          <div>
            <h5>Done tasks:</h5>
            <ul>
              {doneTaskItems}
            </ul>
          </div>
        }       
      </div>
    )
  }
}

// a task details
class TaskItem extends React.Component{
  render(){
    return (
      <li className={this.props.state === "New" ? "task-item-new" : "task-item-done"}>
        <span className="task-item-state">[{this.props.state}]</span>
        {this.props.content}
        {
          this.props.state === "New" && 
          <button className="task-item-setdone" onClick={this.props.SetTaskDone}>Done</button>
        }
        
      </li>
    )
  }
} 