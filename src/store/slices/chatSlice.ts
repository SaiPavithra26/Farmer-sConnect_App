import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  conversations: any[];
  messages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConversations: (state, action: PayloadAction<any[]>) => {
      state.conversations = action.payload;
      state.loading = false;
    },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
      state.loading = false;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setConversations, setMessages, addMessage, setError } = chatSlice.actions;
export default chatSlice.reducer;