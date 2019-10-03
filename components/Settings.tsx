import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';
import debounce from 'lodash/debounce';

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
    margin-bottom: 12px;
  }
`;
const SettingsForm: React.FC<SettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const handleSubmit: FormProps['onSubmit'] = e => {
    e.preventDefault();
    validateFields((err, values: ISettings) => {});
  };

  const handleChangeOption = debounce((action: ISettingsAction) => {
    props.dispatchSettings && props.dispatchSettings(action);
  }, 300);

  const {
    width = 400,
    height = 300,
    scrollLeft = 0,
    scrollTop = 0,
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
    columns,
    data,
  } = props;
  return (
    <Style>
      <h3>Options</h3>
      <Form
        onSubmit={handleSubmit}
        labelCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
        colon={false}
      >
        <Form.Item label={'width'}>
          <InputNumber
            size="small"
            min={100}
            defaultValue={width}
            onChange={value => {
              handleChangeOption({ type: SettingsActionType.SET_WIDTH, value });
            }}
          />
        </Form.Item>
        <Form.Item label={'height'}>
          <InputNumber
            size="small"
            min={100}
            defaultValue={height}
            onChange={value => {
              handleChangeOption({
                type: SettingsActionType.SET_HEIGHT,
                value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label={'scrollLeft'}>
          <InputNumber
            size="small"
            defaultValue={scrollLeft}
            onChange={value => {
              handleChangeOption({
                type: SettingsActionType.SET_SCROLL_LEFT,
                value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label={'scrollTop'}>
          <InputNumber
            size="small"
            defaultValue={scrollTop}
            onChange={value => {
              handleChangeOption({
                type: SettingsActionType.SET_SCROLL_TOP,
                value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label={'frozenColumnIndex'}>
          <InputNumber
            size="small"
            defaultValue={frozenColumnIndex}
            onChange={value => {
              handleChangeOption({
                type: SettingsActionType.SET_FROZEN_COLUMN_INDEX,
                value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label={'frozenRowIndex'}>
          <InputNumber
            size="small"
            defaultValue={frozenRowIndex}
            onChange={value => {
              handleChangeOption({
                type: SettingsActionType.SET_FROZEN_ROW_INDEX,
                value,
              });
            }}
          />
        </Form.Item>
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
      </Form>
    </Style>
  );
};
const Settings = Form.create<SettingsProps>({})(SettingsForm);
export default Settings;
