import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import { IDefaultOptions } from 'pages';

export interface DefaultOptionsProps
  extends FormComponentProps,
  IDefaultOptions {
  onChangeOptions?: (options: IDefaultOptions) => void;
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
const DefaultOptionsForm: React.FC<DefaultOptionsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const handleSubmit: FormProps['onSubmit'] = e => {
    e.preventDefault();
    validateFields((err, values: IDefaultOptions) => {});
  };
  const handleChangeOption = (key: string, value: any) => {
    if (props.onChangeOptions) {
      props.onChangeOptions({ [key]: value });
    }
  };
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
        <Form.Item label="width">
          {getFieldDecorator('width', { initialValue: width })(
            <InputNumber
              size="small"
              min={100}
              onChange={value => {
                handleChangeOption('width', value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item label="height">
          {getFieldDecorator('height', { initialValue: height })(
            <InputNumber
              size="small"
              min={100}
              onChange={value => {
                handleChangeOption('height', value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item label="scrollLeft">
          {getFieldDecorator('scrollLeft', { initialValue: scrollLeft })(
            <InputNumber
              size="small"
              onChange={value => {
                handleChangeOption('scrollLeft', value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item label="scrollTop">
          {getFieldDecorator('scrollTop', { initialValue: scrollTop })(
            <InputNumber
              size="small"
              onChange={value => {
                handleChangeOption('scrollTop', value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item label="frozenColumnIndex">
          {getFieldDecorator('frozenColumnIndex', {
            initialValue: frozenColumnIndex,
          })(
            <InputNumber
              size="small"
              onChange={value => {
                handleChangeOption('frozenColumnIndex', value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item label="frozenRowIndex">
          {getFieldDecorator('frozenRowIndex', {
            initialValue: frozenRowIndex,
          })(
            <InputNumber
              size="small"
              onChange={value => {
                handleChangeOption('frozenRowIndex', value);
              }}
            />,
          )}
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
                handleChangeOption('columns', JSON.parse(values.columns));
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
                handleChangeOption('data', JSON.parse(values.data));
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
const DefaultOptions = Form.create<DefaultOptionsProps>({})(DefaultOptionsForm);
export default DefaultOptions;
