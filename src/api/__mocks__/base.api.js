export const themesApi = jest.fn();
export const servicesApi = jest.fn();
export const tasksApi = {
  list: jest.fn(),
  update: jest.fn(),
};
export const mobilitiesApi = {
  list: jest.fn(),
  defineCurrent: jest.fn(),
  update: jest.fn(),
};
export const subscribeApi = {
  load: jest.fn(),
  commit: jest.fn(),
};
export const profilesApi = jest.fn();
export const authApi = jest.fn();
export const userProfileApi = {
  updatePassword: jest.fn(),
  save: jest.fn(),
};
