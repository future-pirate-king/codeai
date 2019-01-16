import { Reducer } from 'redux';

export interface User {
  id: String;
  name: String;
  email: String;
  photoUrl?: String;
  role?: {
    admin: boolean;
  };
}

const initialState: User = {
  id: '',
  name: '',
  email: '',
  role: {
    admin: false
  }
};

export const LoginReducer: Reducer<User, any> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
  }
  return state;
};
