import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import debounce from 'lodash/debounce';
import { Datagrid, DatagridHeader, DatagridBody } from '@axui/datagrid';
import { IData, IColumn } from '@axui/datagrid/common/Types';
import 'styles/global';
import '@axui/datagrid/scss/style.scss';
import { LayoutRoot, Nav, ControlBox, Viewer } from 'layouts';
import { ISettings, SettingsActionType } from 'common/settings';
import settingsReducer from 'reducer/settingsReducer';
import Settings from 'components/Settings';

const initialSettings: ISettings = {
  columns: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }],
  data: [
    { value: { id: '1', name: 'tom' } },
    { value: { id: '2', name: 'seowoo' } },
  ],
};
const Home: React.FC = props => {
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings,
  );

  console.log('settings value is ', settings);
  const {
    width = 400,
    height = 300,
    scrollLeft = 0,
    scrollTop = 0,
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
    columns,
    data,
  } = settings;

  useEffect(() => {
    //
  }, []);

  // TODO: useMemo
  const onChangeSettings = debounce((key: keyof ISettings, value: any) => {
    switch (key) {
      case 'columns':
      case 'width':
      case 'height':
      case 'scrollLeft':
      case 'scrollTop':
      case 'frozenColumnIndex':
      case 'frozenRowIndex':
      case 'columns':
      case 'data':
      default:
        dispatchSettings({ type: key as SettingsActionType, value });
        break;
    }
  }, 500);

  return (
    <LayoutRoot>
      <Nav />
      <ControlBox>
        <Settings {...settings} onChangeSettings={onChangeSettings} />
      </ControlBox>
      <Viewer>
        <Datagrid
          width={width}
          height={height}
          columns={columns}
          data={data}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          frozenColumnIndex={frozenColumnIndex}
          frozenRowIndex={frozenRowIndex}
        >
          <DatagridHeader />
          <DatagridBody />
        </Datagrid>
      </Viewer>
    </LayoutRoot>
  );
};

export default Home;
