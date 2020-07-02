import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
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
      <div className="PageTitle-div">
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
      <div className="AddNewTask-box">
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
      newtasks:[],
      donetasks:[]
    }

    this.AddNewTaskItem = this.AddNewTaskItem.bind(this);
    this.SetTaskAsDone = this.SetTaskAsDone.bind(this);
  }

  AddNewTaskItem(text){
    var addToTaskList = true;
    this.state.newtasks.forEach(task => {
      if(task.Content == text){
        addToTaskList =  false;
        return;
      }
    });
    if(addToTaskList){
      this.setState({newtasks: this.state.newtasks.concat({Content: text})});
    }else{
      alert("This task already exists!");
    }
    
  }

  SetTaskAsDone(text){
    //update newTask list
    var updateNewTaskList = [];
    this.state.newtasks.forEach(task => {
      if(task.Content != text){
        updateNewTaskList.push(task);
      }
    });
    this.setState({newtasks: updateNewTaskList});
    //update doneTask list
    this.setState({donetasks: this.state.donetasks.concat({Content: text})});
  }

  render(){
    const taskFinishRate = Math.round(this.state.donetasks.length/(this.state.newtasks.length + this.state.donetasks.length) * 10000) / 100 + "%";
    return (
      <div>
        <AddNewTask GetNewTask={this.AddNewTaskItem}/>
        <div>
    {(this.state.newtasks.length > 0 || this.state.donetasks.length > 0) && <h4 className="DisplayAllTasks-box">All tasks: (Task finish rate: <span>{taskFinishRate}</span>)</h4>}
          <DisplayAllTasks TaskList={this.state.newtasks} SetTaskDone={this.SetTaskAsDone} TaskState="New"/>
          <DisplayAllTasks TaskList={this.state.donetasks} TaskState="Done"/>
        </div>
      </div>
    );
  }
}

//show all tasks 
class DisplayAllTasks extends React.Component{
  render(){
    const taskLists = [];
    this.props.TaskList.forEach(item => {
      console.log(item);
      taskLists.push(<TaskItem content={item.Content} key={item.Content} state={this.props.TaskState} SetTaskDone={() => this.props.SetTaskDone(item.Content)} />)
    });

    return (
      <div className="DisplayAllTasks-box">
        {
          this.props.TaskList.length > 0 && 
          <h5>{this.props.TaskState == "New" ? "On-going tasks:" : "Finished tasks:" }</h5>
        }
        <ul>
          {taskLists}
        </ul>
      </div>
    )
  }
}

// a task details
class TaskItem extends React.Component{
  render(){
    return (
      <li className={this.props.state == "New" ? "TaskItem-New" : "TaskItem-Done"}>
        <span className="TaskItem-state">[{this.props.state}]</span>
        {this.props.content}
        {
          this.props.state == "New" && 
          <button className="TaskItem-setdone" onClick={this.props.SetTaskDone}>Done</button>
        }
        
      </li>
    )
  }
} 