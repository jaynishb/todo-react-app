import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTodoloading, selectTodos, selectTodoError } from './selectors';
import Todo from './Todo';
import * as Actions from './actions';

const mapStateToProps = (state, props) => ({
  loading: selectTodoloading(state, props),
  todos: selectTodos(state, props),
  error: selectTodoError(state, props)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Actions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
