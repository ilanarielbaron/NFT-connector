import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

export const initialState = {
	answers: [],
} as {
	answers: Question[]
};

const answersSlice = createSlice({
	name: 'answers',
	initialState,
	reducers: {
		updateAnswers: (
			state,
			action: PayloadAction<{ answers: Question[] }>,
		): void => {
			state.answers = action.payload.answers;
		}
	},
});

export const { updateAnswers } = answersSlice.actions;

export const selectAnswers = (state: RootState) => state.answers.answers;

export default answersSlice.reducer;
