import React, { useState } from 'react';
import { TextField, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleUpdateTodo = () => {
    const newTodos = todos.map((todo, i) => (i === editIndex ? editValue : todo));
    setTodos(newTodos);
    setEditIndex(-1);
    setEditValue('');
  };

  return (
    <div>
      <TextField
        label="Add a new task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Add Task
      </Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            {editIndex === index ? (
              <>
                <TextField
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <IconButton onClick={handleUpdateTodo}>
                  <CheckIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary={todo} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditTodo(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
