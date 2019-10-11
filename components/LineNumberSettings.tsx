import React from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Collapse,
  Radio,
  Switch,
} from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';

export interface LineNumberSettingsProps extends FormComponentProps, ISettings {
  handleChangeOption: (action: ISettingsAction) => void;
}

const LineNumberSettingsForm: React.FC<LineNumberSettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const {
    showLineNumber = true,
    lineNumberColumnWidth = 40,
    lineNumberStartAt = 1,
    handleChangeOption,
  } = props;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item label={'showLineNumber'}>
        <Switch
          defaultChecked={showLineNumber}
          onChange={value =>
            handleChangeOption({
              type: SettingsActionType.SET_SHOW_LINENUMBER,
              value,
            })
          }
        />
      </Form.Item>
      <Form.Item label={'lineNumberColumnWidth'}>
        <InputNumber
          size="small"
          defaultValue={lineNumberColumnWidth}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_LINENUMBER_COLUMN_WIDTH,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'lineNumberStartAt'}>
        <InputNumber
          size="small"
          defaultValue={lineNumberStartAt}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_LINENUMBER_START_AT,
              value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
const LineNumberSettings = Form.create<LineNumberSettingsProps>({})(
  LineNumberSettingsForm,
);
export default LineNumberSettings;
