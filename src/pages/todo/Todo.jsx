/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { func, any, arrayOf, shape, string, bool } from 'prop-types';
import { Container, Row, Col, Button, ListGroup, FormControl, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Loader from '../../components/loader';
import TodoItem from './TodoItem';
import Notification from '../../components/Notification';

const AddTodoButton = styled(Button)`
  float: right;
`;

const NoItem = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

const Todo = props => {
  const [todo, setTodo] = useState({});
  const { todos, error, loading } = props;

  useEffect(() => {
    props.getTodos();
  }, []);
  useEffect(() => {
    if (error) {
      Notification.error(error);
    }
  }, [error]);

  const onTodoChanged = ev => {
    setTodo(ev.target.value);
  };
  const addTodo = ev => {
    ev.preventDefault();
    props.addTodo(todo);
  };
  const editTodo = (newTodo, id) => {
    props.editTodo(newTodo, id);
  };
  const onDeletedTodo = id => {
    props.deleteTodo(id);
  };
  const renderdTodos = () => {
    if (todos.length) {
      return todos.map(todoItem => (
        // eslint-disable-next-line no-underscore-dangle
        <TodoItem key={todoItem._id} deleteTodo={onDeletedTodo} editTodo={editTodo} {...todoItem} />
      ));
    }

    return (
      <ListGroup.Item>
        <NoItem>No Todo Selected</NoItem>
      </ListGroup.Item>
    );
  };
  return (
    <Container>
      <Loader loading={loading} />
      <Row>
        <Col className="mt-3 mb-3" md={12} xs={12}>
          <ListGroup>
            <ListGroup.Item variant="secondary"> {`Today's Plan`}</ListGroup.Item>
            <ListGroup.Item>
              <Form onSubmit={addTodo}>
                <Row>
                  <Col md={9} xs={12}>
                    <FormControl required onChange={onTodoChanged} />
                  </Col>
                  <Col md={3} xs={12} className="mt-1">
                    <AddTodoButton type="submit" size="sm" disabled={todo === null}>
                      Add
                    </AddTodoButton>
                  </Col>
                </Row>
              </Form>
            </ListGroup.Item>
            {renderdTodos()}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

Todo.propTypes = {
  todos: arrayOf(
    shape({
      _id: any.isRequired,
      task: string,
      completedAt: string
    })
  ).isRequired,
  error: string,
  loading: bool,
  addTodo: func.isRequired,
  getTodos: func.isRequired,
  editTodo: func.isRequired,
  deleteTodo: func.isRequired
};

Todo.defaultProps = {
  error: null,
  loading: false
};

export default Todo;
