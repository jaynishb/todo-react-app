import React, { useState } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { ListGroup, Button, Form, Row, Col, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Title = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : null)};
`;

const Action = styled.div`
  float: right;
`;

const Clickable = styled.div`
  cursor: pointer;
`;

const TodoItem = props => {
  const [isEditing, setEditing] = useState(false);
  const [todo, setTodo] = useState(null);
  const { task, _id, editTodo, deleteTodo, completedAt, createdAt } = props;
  const onTodoChanged = event => {
    setTodo(event.target.value);
  };
  const onSave = () => {
    editTodo({ task: todo }, _id);
    setEditing(false);
  };
  const onCompleted = () => {
    const completed = completedAt ? null : Date.now();
    editTodo({ completedAt: completed }, _id);
    setEditing(false);
  };
  const onDelete = () => {
    deleteTodo(_id);
  };
  const onCancel = () => {
    setEditing(false);
    setTodo(null);
  };
  return (
    <ListGroup.Item>
      {!isEditing && (
        <Row>
          <Col md={1} xs={6} onClick={onCompleted}>
            <Clickable>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" onChange={onCompleted} checked={completedAt !== null} />
              </Form.Group>
            </Clickable>
          </Col>
          <OverlayTrigger
            placement="top"
            overlay={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Tooltip>
                <strong>{createdAt}</strong>
              </Tooltip>
            }
          >
            <Col md={8} xs={6} onClick={onCompleted}>
              <Clickable>
                <Title completed={completedAt !== null}>{task}</Title>
              </Clickable>
            </Col>
          </OverlayTrigger>
          <Col md={3} xs={12}>
            <Button className="float-right ml-1 delete-button" size="sm" variant="danger" onClick={onDelete}>
              Delete
            </Button>
            <Button className="float-right edit-button" size="sm" variant="warning" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </Col>
        </Row>
      )}
      {isEditing && (
        <Row>
          <Col md={9} xs={12}>
            <FormControl defaultValue={task} onChange={onTodoChanged} />
          </Col>
          <Col md={3} xs={12} className="mt-2">
            <Action>
              <Button size="sm" variant="warning" onClick={onSave} disabled={todo === null}>
                Save
              </Button>
              <Button className="ml-1" size="sm" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </Action>
          </Col>
        </Row>
      )}
    </ListGroup.Item>
  );
};

TodoItem.propTypes = {
  _id: string.isRequired,
  task: string,
  completedAt: string,
  createdAt: string,
  editTodo: func,
  deleteTodo: func
};

TodoItem.defaultProps = {
  task: null,
  createdAt: null,
  editTodo: () => null,
  deleteTodo: () => null,
  completedAt: null
};

export default TodoItem;
