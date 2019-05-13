import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import TodoItem from '../index';

describe('Todo Item', () => {
  const props = {
    task: 'xyz',
    _id: 'ufcghj'
  };
  it('should render', () => {
    const { getByText } = render(<TodoItem {...props} />);
    const EditButton = getByText('Edit');
    const NameSpan = getByText('xyz');
    expect(EditButton).toBeDefined();
    expect(NameSpan).toBeDefined();
  });

  it('should open input box with two buttons when click on Edit button', async () => {
    const { getByText } = render(<TodoItem {...props} />);
    const EditButton = getByText('Edit');

    fireEvent.click(EditButton);
    await wait(() => {
      const cancelBtn = getByText('Cancel');
      const saveBtn = getByText('Save');
      expect(cancelBtn).toBeDefined();
      expect(saveBtn.disabled).toBe(true);
    });
  });
  it('should bring back to previes view when click on cancel button', async () => {
    const { getByText } = render(<TodoItem {...props} />);
    const EditButton = getByText('Edit');

    fireEvent.click(EditButton);
    await wait(() => {
      const cancelBtn = getByText('Cancel');
      expect(cancelBtn.disabled).toBe(false);
      fireEvent.click(cancelBtn);
    });
    await wait(() => {
      const NameSpan = getByText('xyz');
      expect(EditButton).toBeDefined();
      expect(NameSpan).toBeDefined();
    });
  });
  it('should delete the todo', async () => {
    const { getByText } = render(<TodoItem {...props} />);
    const DeleteButton = getByText('Delete');
    expect(DeleteButton).toBeDefined();
  });
});
