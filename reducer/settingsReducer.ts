import { SettingsReducer, SettingsActionType } from 'common/settings';

const settingsReducer: SettingsReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case SettingsActionType.SET_WIDTH:
      return { ...state, width: value };
    case SettingsActionType.SET_HEIGHT:
      return { ...state, height: value };
    case SettingsActionType.SET_SCROLL_LEFT:
      return { ...state, scrollLeft: value };
    case SettingsActionType.SET_SCROLL_TOP:
      return { ...state, scrollTop: value };
    case SettingsActionType.SET_COLUMNS:
      return { ...state, columns: value };
    case SettingsActionType.SET_DATA:
      return { ...state, data: value };
    default:
      throw new Error();
  }
};

export default settingsReducer;
