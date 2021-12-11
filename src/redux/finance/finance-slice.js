import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactionOperation,
  fetchTransactionCategory,
} from './finance-operations';

import {
  fetchTotalBalance,
  fetchData,
  fetchDataByCategory,
  fetchDataByQuery,
} from './finance-operations';

const initialState = {
  // isFetchingTotalBalance: false,
  // isFetchingData: false,
  error: null,
  totalBalance: null,
  // totalBalance: 0,
  // data: {},
  // data: [],
  data: null,
  dataByCategory: null,
  isLoading: false,
  dataNewTransaction: null,
  listCategories: [],
  isErrorTransation: false,
  errorMessage: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  extraReducers: {
    [fetchTotalBalance.pending](state, _) {
      // state.isFetchingTotalBalance = true;
      state.isLoading = true;
      state.error = null;
    },
    [fetchTotalBalance.fulfilled](state, { payload }) {
      // console.log(payload);
      state.totalBalance = payload;
      // state.isFetchingTotalBalance = false;
      state.isLoading = false;
    },
    [fetchTotalBalance.rejected](state, _) {
      // state.isFetchingTotalBalance = false;
      // state.isFetchingTotalBalance = false;
      state.isLoading = false;
      //спиннер
    },
    [fetchData.pending](state) {
      // state.isFetchingData = true;
      //спиннер
      state.isLoading = true;
      state.error = null;
    },
    [fetchData.fulfilled](state, { payload }) {
      // console.log('payload trans',payload);
      // state.totalBalance = payload[0]
      state.data = payload;
      state.isLoading = false;
      // state.isFetchingData = false;
      //спиннер
    },
    [fetchData.rejected](state, { payload }) {
      // state.isFetchingData = false;
      state.isLoading = false;
      //спиннер

      state.error = payload;
    },

    [fetchTransactionOperation.pending](state) {
      state.isErrorTransation = false;
      state.errorMessage = null;
      state.isLoading = true;
    },

    [fetchTransactionOperation.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.dataNewTransaction = payload;
    },

    [fetchTransactionOperation.rejected](state, { payload }) {
      state.isLoading = false;
      state.errorMessage = payload;
      state.isErrorTransation = true;
    },

    [fetchDataByCategory.pending](state) {
      //спиннер ?
      state.isLoading = true;
      state.error = null;
    },
    [fetchDataByCategory.fulfilled](state, { payload }) {
      state.dataByCategory = payload;
      state.isLoading = false;
      //спиннер ?
    },
    [fetchDataByCategory.rejected](state, { payload }) {
      state.isLoading = false;
      //спиннер ?
      state.error = payload;
    },

    [fetchDataByQuery.pending](state) {
      //спиннер ?
      state.isLoading = true;
      state.error = null;
    },
    [fetchDataByQuery.fulfilled](state, { payload }) {
      state.dataByCategory = payload;
      state.isLoading = false;
      //спиннер ?
    },
    [fetchDataByQuery.rejected](state, { payload }) {
      state.isLoading = false;
      //спиннер ?
      state.error = payload;
    },
    [fetchTransactionCategory.pending](state) {
      state.isErrorTransation = false;
      state.errorMessage = null;
      state.isLoading = true;
    },

    [fetchTransactionCategory.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.listCategories = payload;
    },

    [fetchTransactionCategory.rejected](state, { payload }) {
      state.isLoading = false;
      state.errorMessage = payload;
      state.isErrorTransation = true;
    },
  },
});
//fetchTransactionCategory
export default financeSlice.reducer;
