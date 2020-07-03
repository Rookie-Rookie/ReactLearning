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
      <div id="PageTitle-div">
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
      <div id="AddNewTask-box">
        <span className="AddNewTask-items">Add a new Task:</span>
        <input placeholder="Type something about your new task..." className="AddNewTask-items" onChange={this.InputChange} value={this.state.text}/> 
        <button className="AddNewTask-items" onClick={this.SubmitNewTask}>Add</button>
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
        return [].concat(arr);
      }else{
        return [].concat(arr, [item]);
      }
    }, [{Content: text, State: "New"}]);
    this.setState({totalTasks: newTaskList});
  }  

  SetTaskAsDone(text){
    //update new and done task list
    let updateNewTaskList = [];
    this.state.totalTasks.forEach(task => {
      if(task.Content != text){
        updateNewTaskList.push(task);
      }
    });
    this.setState({totalTasks: [...updateNewTaskList, {Content: text, State: "Done"}]});
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
    {this.state.totalTasks.length > 0 && <h4 className="DisplayAllTasks-box">All tasks: (Task finish rate: <span>{taskFinishRate}</span>)</h4>}
          <DisplayAllTasks TaskList={this.state.totalTasks} SetTaskDone={this.SetTaskAsDone} />
        </div>
      </div>
    );
  }
}

//show all tasks 
class DisplayAllTasks extends React.Component{
  render(){
    // const taskLists = this.props.TaskList.map((item) => 
    //   <TaskItem content={item.Content} key={item.Content} state={this.props.TaskState} SetTaskDone={() => this.props.SetTaskDone(item.Content)} />
    // );
    const newTaskItems=[];
    const doneTaskItems=[];
    this.props.TaskList.forEach(item =>{
      item.State === "New" 
      ? newTaskItems.push(<TaskItem content={item.Content} key={item.Content} state={item.State} SetTaskDone={() => this.props.SetTaskDone(item.Content)} />) 
      : doneTaskItems.push(<TaskItem content={item.Content} key={item.Content} state={item.State} />);
    });

    return (
      <div id="DisplayAllTasks-box">
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
      <li className={this.props.state === "New" ? "TaskItem-New" : "TaskItem-Done"}>
        <span className="TaskItem-state">[{this.props.state}]</span>
        {this.props.content}
        {
          this.props.state === "New" && 
          <button className="TaskItem-setdone" onClick={this.props.SetTaskDone}>Done</button>
        }
        
      </li>
    )
  }
} 