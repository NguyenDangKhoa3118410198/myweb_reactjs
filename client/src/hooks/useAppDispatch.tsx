import { useDispatch } from 'react-redux';
import { AppDispatch } from 'components/features/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
