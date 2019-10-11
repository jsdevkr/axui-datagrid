import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Collapse } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';
import debounce from 'lodash/debounce';
import BaseSettings from './BaseSettings';
import ScrollSettings from './ScrollSettings';
import LineNumberSettings from './LineNumberSettings';
import ColumnsSettings from './ColumnsSettings';
import DataSettings from './DataSettings';

export interface SettingsProps extends FormComponentProps, ISettings {
  dispatchSettings: (action: ISettingsAction) => void;
}

const Style = styled.div`
  .ant-form-item {
    margin: 0;
    padding: 8px 16px;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 10px 0;
  }
`;
const SettingsForm: React.FC<SettingsProps> = props => {
  const [activeKeys, setActiveKeys] = useState(['BASE']);
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const handleChangeOption = debounce((action: ISettingsAction) => {
    props.dispatchSettings && props.dispatchSettings(action);
  }, 300);

  const {
    width = 400,
    height = 300,
    headerHeight = 30,
    headerAlign = 'left',
    bodyRowHeight = 25,
    bodyAlign = 'left',
    scrollLeft = 0,
    scrollTop = 0,
    showLineNumber = true,
    lineNumberColumnWidth = 50,
    lineNumberStartAt = 1,
    columns,
    data,
  } = props;

  return (
    <Style>
      <Collapse
        expandIconPosition="right"
        activeKey={activeKeys}
        onChange={activeKeys =>
          setActiveKeys(
            typeof activeKeys === 'string' ? [activeKeys] : activeKeys,
          )
        }
      >
        <Collapse.Panel header="BASE" key="BASE">
          <BaseSettings
            {...{
              width,
              height,
              headerHeight,
              headerAlign,
              bodyRowHeight,
              bodyAlign,
            }}
            handleChangeOption={handleChangeOption}
          />
        </Collapse.Panel>
        <Collapse.Panel header="SCROLL" key="SCROLL">
          <ScrollSettings
            {...{
              scrollLeft,
              scrollTop,
            }}
            handleChangeOption={handleChangeOption}
          />
        </Collapse.Panel>
        <Collapse.Panel header="LINE NUMBER" key="LINE_NUMBER">
          <LineNumberSettings
            {...{
              showLineNumber,
              lineNumberColumnWidth,
              lineNumberStartAt,
            }}
            handleChangeOption={handleChangeOption}
          />
        </Collapse.Panel>
        <Collapse.Panel header="COLUMNS" key="COLUMNS">
          <ColumnsSettings
            columns={columns}
            handleChangeOption={handleChangeOption}
          />
        </Collapse.Panel>
        <Collapse.Panel header="DATA" key="DATA">
          <DataSettings data={data} handleChangeOption={handleChangeOption} />
        </Collapse.Panel>
      </Collapse>
    </Style>
  );
};
const Settings = Form.create<SettingsProps>({})(SettingsForm);
export default Settings;
