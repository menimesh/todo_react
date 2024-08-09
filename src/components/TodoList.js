import React,{useState} from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
const TodoList = () => {
    const [todoList,setTodoList]=useState([]);
    const [text,setText]=useState();
    const addTodo=()=>{
        setTodoList([
            ...todoList,
            {
                data:text,
                date:new Date().toLocaleString().split(",")[0],
                isCompleted:false,
            }
        ]);
        setText("")
    }
const complete=(id)=>{
const newTodo=todoList.map((todo,index)=>{
    if(id===index) return {...todo, isCompleted: !todo.isCompleted};
    else return todo;
});
setTodoList(newTodo);
}
const deleteData=(ind)=>{
const newTodo=todoList.filter((todo,index)=>{
    if(index===ind) return false;
    else return true;
})
setTodoList(newTodo);
}
  return (
  <>
  <Container className='mt-2 text-center'>
  <h2>List</h2>
  <Form.Control type='text' value={text} onChange={(e)=>{setText(e.target.value)}}/>
    <br/>
  <Button onClick={addTodo}>
    Add
  </Button>
  <br/><br/>
  {todoList.length>0
  ?todoList.map((todo,index)=>{
    return (
    <Alert 
        variant={todo.isCompleted?"danger":"primary"}
        className='text-start' style={{
        cursor:'pointer',
        textDecoration:todo.isCompleted? "line-through" : "none"
    }} onClick={()=>complete(index)} >{todo.data}
     <Button className='ml-30' onClick={()=>{deleteData(index)}}>Delete</Button>
     </Alert>
   
     );
  }):"    No Todos"}

  
  </Container>

 
  </>
  )
}

export default TodoList