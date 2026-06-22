export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  mobile: string | null;
  updated_at: string;
  created_at: string;
}

export interface Address {
  id: number;
  user_id: number;
  contact_number: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  updated_at: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  status_code: number;
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponse {
  status_code: number;
  success: boolean;
  message: string;
  access_token?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileUpdatePayload {
  name?: string;
  mobile?: string;
  password?: string;
}

export interface AddressCreatePayload {
  user_id: number;
  contact_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface AddressUpdatePayload {
  contact_number?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}
