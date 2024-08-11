import React, { useState } from 'react';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [text, setText] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

   
    const addTodo = () => {
        if (text.trim() === "") return; 
        setTodoList([
            ...todoList,
            {
                data: text,
                date: new Date().toLocaleString().split(",")[0],
                sakiyo: false,
            }
        ]);
        setText("");
    };
    const complete = (id) => {
        const newTodo = todoList.map((todo, index) => {
            if (id === index) return { ...todo, sakiyo: !todo.sakiyo };
            else return todo;
        });
        setTodoList(newTodo);
    };

    // Delete a task from the todo list
    const deleteData = (ind) => {
        const newTodo = todoList.filter((_, index) => index !== ind);
        setTodoList(newTodo);
    };

    // Open the edit modal and set the current task to be edited
    const editData = (index) => {
        setEditIndex(index);
        setEditValue(todoList[index].data);
        setShowEditModal(true);
    };

    // Save the edited task
    const saveData = () => {
        const newTodo = todoList.map((todo, index) => {
            if (index === editIndex) return { ...todo, data: editValue };
            else return todo;
        });
        setTodoList(newTodo);
        setShowEditModal(false);
    };

    return (
        <>
            <Container className='mt-2 text-center'>
                <h2>List</h2>
                <Form.Control 
                    type='text' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <br />
                <Button onClick={addTodo}>
                    Add
                </Button>
                <br /><br />
                {todoList.length > 0
                    ? todoList.map((todo, index) => {
                        return (
                            <Alert 
                                key={index}
                                variant={todo.sakiyo ? "danger" : "primary"}
                                className='text-start' 
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: todo.sakiyo ? "line-through" : "none"
                                }} 
                                onClick={() => complete(index)}
                            >
                                {todo.data}
                                <Button 
                                    variant="danger" 
                                    className='ml-30' 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the complete function
                                        deleteData(index);
                                    }}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    variant="success" 
                                    className='ml-30' 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        editData(index);
                                    }}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </Button>
                            </Alert>
                        );
                    })
                    : "No Todos"
                }
            </Container>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control 
                        type='text' 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='primary' 
                        onClick={() => saveData()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TodoList;
