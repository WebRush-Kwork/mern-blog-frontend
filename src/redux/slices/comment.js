import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAllComments = createAsyncThunk(
	'comment/fetchAllComments',
	async () => {
		const { data } = await axios.get('/comment')
		return data
	}
)

const initialState = {
	data: null,
	status: 'loading',
}

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllComments.pending]: state => {
			state.data = null
			state.status = 'loading'
		},
		[fetchAllComments.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchAllComments.rejected]: state => {
			state.data = null
			state.status = 'error'
		},
	},
})

export const isData = state => Boolean(state.comments.data)
export const commentReducer = commentSlice.reducer
