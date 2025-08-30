import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/src/types/product';

interface ProductState {
  products: Product[];
  myProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  myProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    setMyProducts: (state, action: PayloadAction<Product[]>) => {
      state.myProducts = action.payload;
      state.loading = false;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.myProducts.push(action.payload);
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.myProducts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.myProducts[index] = action.payload;
      }
      const productIndex = state.products.findIndex(p => p.id === action.payload.id);
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setLoading, 
  setProducts, 
  setMyProducts, 
  setSelectedProduct, 
  addProduct, 
  updateProduct, 
  setError 
} = productSlice.actions;
export default productSlice.reducer;