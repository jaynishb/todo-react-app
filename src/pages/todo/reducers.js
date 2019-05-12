import { createQueryReducer } from '../../store/query/queryReducer';
import { MAP_TODO } from './constants';

const mapReducer = createQueryReducer(MAP_TODO);

export default mapReducer;
