import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { CreatePrivateRoomPopupEventSchema, PopupEventType } from '../../../popup-event';
import { JoinPrivateRoomPopupEventSchema } from '../../../popup-event/join-private-room';

type FieldType = {
  roomId: string;
  roomPassword: string;
};


const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

  const {
    roomId,
    roomPassword,
  } = values;

  const joinRoomEvent: JoinPrivateRoomPopupEventSchema = {
    eventType: PopupEventType.JOIN_PRIVATE_ROOM,
    eventData: {
      roomId,
      roomPassword,
    }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, joinRoomEvent);
    }
  });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
};

const JoinRoomForm = () => {
  return ( 
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
  >
      <Form.Item<FieldType>
        label="Room Id"
        name="roomId"
        rules={[{ required: true, message: 'Please input a room id!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="roomPassword"
        rules={[{ required: true, message: 'Please input a password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
  </Form>
  )
};

export default JoinRoomForm;