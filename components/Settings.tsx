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

export interface SettingsProps extends FormComponentProps, ISettings {
  dispatchSettings: (action: ISettingsAction) => void;
}

const JSONValidator = (rule: any, value: any, callback: any) => {
  try {
    JSON.parse(value);
    callback();
  } catch (err) {
    callback('It is not JSON format');
  }
};

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
    headerHeight,
    headerAlign,
    bodyRowHeight,
    bodyAlign,
    scrollLeft = 0,
    scrollTop = 0,
    showLineNumber = true,
    lineNumberColumnWidth = 40,
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
          <Form.Item
            labelCol={{ xs: 24, sm: 24 }}
            wrapperCol={{ xs: 24, sm: 24 }}
            label="columns"
            labelAlign="left"
          >
            {getFieldDecorator('columns', {
              initialValue: JSON.stringify(columns),
              rules: [
                {
                  validator: JSONValidator,
                },
              ],
            })(<Input.TextArea rows={6} />)}
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button
              htmlType="button"
              type="primary"
              size="small"
              onClick={() => {
                props.form.validateFields(['columns'], (errors, values) => {
                  handleChangeOption({
                    type: SettingsActionType.SET_COLUMNS,
                    value: JSON.parse(values.columns),
                  });
                });
              }}
            >
              Apply
            </Button>
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="DATA" key="DATA">
          <Form.Item
            labelCol={{ xs: 24, sm: 24 }}
            wrapperCol={{ xs: 24, sm: 24 }}
            label="data"
            labelAlign="left"
          >
            {getFieldDecorator('data', {
              initialValue: JSON.stringify(data),
              rules: [
                {
                  validator: JSONValidator,
                },
              ],
            })(<Input.TextArea rows={12} />)}
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                props.form.validateFields(['data'], (errors, values) => {
                  handleChangeOption({
                    type: SettingsActionType.SET_DATA,
                    value: JSON.parse(values.data),
                  });
                });
              }}
            >
              Apply
            </Button>
          </div>
        </Collapse.Panel>
      </Collapse>
    </Style>
  );
};
const Settings = Form.create<SettingsProps>({})(SettingsForm);
export default Settings;
