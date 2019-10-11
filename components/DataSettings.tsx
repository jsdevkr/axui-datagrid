import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Collapse, Radio } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';
import { JSONValidator } from 'common/utils';

export interface DataSettingsProps extends FormComponentProps, ISettings {
  handleChangeOption: (action: ISettingsAction) => void;
}

const DataSettingsForm: React.FC<DataSettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const { data, handleChangeOption } = props;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item
        labelCol={{ xs: 24, sm: 24 }}
        wrapperCol={{ xs: 24, sm: 24 }}
        label="columns"
        labelAlign="left"
      >
        {getFieldDecorator('data', {
          initialValue: JSON.stringify(data),
          rules: [
            {
              validator: JSONValidator,
            },
          ],
        })(<Input.TextArea rows={6} />)}
        <div style={{ textAlign: 'right' }}>
          <Button
            htmlType="button"
            type="primary"
            size="small"
            onClick={() => {
              props.form.validateFields(['data'], (errors, values) => {
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
      </Form.Item>
    </Form>
  );
};
const DataSettings = Form.create<DataSettingsProps>({})(DataSettingsForm);
export default DataSettings;
