import { SettingsReducer } from 'common/settings';

const settingsReducer: SettingsReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case 'columns':
      return { ...state, columns: value };
    case 'width':
      return { ...state, width: value };
    default:
      throw new Error();
  }
};

export default settingsReducer;
