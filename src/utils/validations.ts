export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{7,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

export const validatePrice = (price: string | number): boolean => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(priceNum) && priceNum > 0;
};

export const validateStock = (stock: string | number): boolean => {
  const stockNum = typeof stock === 'string' ? parseInt(stock, 10) : stock;
  return !isNaN(stockNum) && stockNum >= 0;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateProductName = (name: string): boolean => {
  return name.trim().length >= 3 && name.trim().length <= 100;
};

export const validateDescription = (description: string): boolean => {
  return description.trim().length >= 10 && description.trim().length <= 500;
};

export const validateQuantity = (quantity: string | number): boolean => {
  const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
  return !isNaN(qty) && qty > 0 && qty <= 1000;
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateRequired(email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name)) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProductForm = (data: {
  name: string;
  description: string;
  price: string;
  stock: string;
  images: string[];
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!validateRequired(data.name)) {
    errors.name = 'Product name is required';
  } else if (!validateProductName(data.name)) {
    errors.name = 'Product name must be between 3-100 characters';
  }

  if (!validateRequired(data.description)) {
    errors.description = 'Description is required';
  } else if (!validateDescription(data.description)) {
    errors.description = 'Description must be between 10-500 characters';
  }

  if (!validateRequired(data.price)) {
    errors.price = 'Price is required';
  } else if (!validatePrice(data.price)) {
    errors.price = 'Please enter a valid price';
  }

  if (!validateRequired(data.stock)) {
    errors.stock = 'Stock quantity is required';
  } else if (!validateStock(data.stock)) {
    errors.stock = 'Please enter a valid stock quantity';
  }

  if (data.images.length === 0) {
    errors.images = 'At least one product image is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};