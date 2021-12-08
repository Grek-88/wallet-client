import API from 'services/wallet-API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTransaction } from 'services/transaction-api';

import { closeModal } from 'redux/modal/modal-action';
const { Unauthorized } = require('http-errors');

export const fetchTotalBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken !== null) {
      try {
        const balance = await API.fetchTotalBalance();
        return balance;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchTransactionOperation = createAsyncThunk(
  'finance/transaction',
  async (data, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const persistedToken = state.auth.token;

      const persistedToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFmYzU4ZmNlYjc2N2VlNjc5Njk2NTkiLCJuYW1lIjoiaWxmYXQiLCJpYXQiOjE2Mzg5MTEzODl9.qxTjUtYiD_5v_gFUybM4BrbqPT58DUYbXEgW9tycSkk';

      if (persistedToken) {
        const result = await ApiTransaction(persistedToken, data);

        if (result.data.data.transaction) thunkAPI.dispatch(closeModal());
        return result.data.data.transaction;
      } else {
        throw new Unauthorized('Не авторизирован');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
