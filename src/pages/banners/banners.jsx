import { useState } from "react";
import { Button, Dropdown, Flex, Form, Input, Modal, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { bannersEndPoints } from "../../config/endpoints";
import { useGetList } from "../../service/query/useGetList";
import { useCreate } from "../../service/mutation/useCreate";
import { useUpdateById } from "../../service/mutation/useUpdateById";
import { useGetById } from "../../service/query/useGetById";
import { useDeleteById } from "../../service/mutation/useDeleteById";

export const Banners = () => {
  const [form] = Form.useForm();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = useGetList(bannersEndPoints.list, {
    limit,
    offset,
  });

  const { mutate: bannerCreate, isPending } = useCreate(
    bannersEndPoints.create,
    bannersEndPoints.list
  );

  const { mutate: bannerUpdate, isPending: updatePending } = useUpdateById(
    bannersEndPoints.update,
    bannersEndPoints.list
  );

  const { data: editData, isLoading: editDataLoading } = useGetById(
    bannersEndPoints.get,
    currentId
  );

  const { mutate: bannerDelete, isPending: bannerDeletePending } =
    useDeleteById(bannersEndPoints.delete, bannersEndPoints.list);

  return (
    <>
      <Table
        className="mt-3"
        bordered
        size="small"
        loading={isLoading}
        title={() => {
          return (
            <Flex
              align="center"
              justify="space-between"
              wrap
              className="md:p-2"
            >
              <h2 className="md:text-xl font-bold">Bannerlar Ro'yxati</h2>
              <Button
                type="primary"
                onClick={() => (setIsModalOpen(true), form.resetFields())}
                children="Banner Qo'shish"
                icon={<PlusCircleOutlined />}
              />
            </Flex>
          );
        }}
        dataSource={data?.Banner?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        columns={[
          {
            title: "Rasm",
            dataIndex: "img_url",
            render: (text) => (
              <img src={text} alt="Banner" style={{ width: 100, height: 50 }} />
            ),
          },
          {
            title: "Url",
            dataIndex: "url",
            render: (text) => (
              <p className="font-bold">
                <a target="_blank" href={text}>
                  {text}
                </a>
              </p>
            ),
          },
          {
            width: "0",
            title: () => <SettingOutlined />,
            dataIndex: "id",
            render: (text, record) => (
              <Flex justify="center">
                <Dropdown
                  placement="bottomLeft"
                  trigger={["click"]}
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: (
                          <Button
                            block
                            children="Tahrirlash"
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setIsModalOpen(true);
                              setIsEdit(true);
                              setCurrentId(record?.id);
                              form.setFieldsValue({
                                img_url: record.img_url,
                                url: record.url,
                              });
                            }}
                          />
                        ),
                      },
                      {
                        key: "view",
                        label: (
                          <Button
                            block
                            children="Batafsil"
                            type="link"
                            icon={<InfoCircleOutlined />}
                            className="border-blue-500"
                            onClick={() => (
                              setIsModalView(true), setCurrentId(record?.id)
                            )}
                          />
                        ),
                      },
                      {
                        key: "delete",
                        label: (
                          <Button
                            block
                            children="O'chirish"
                            danger
                            type="primary"
                            loading={bannerDeletePending}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              Modal.confirm({
                                title: "O'chirish",
                                content: "Bannerni o'chirishni xohlaysizmi?",
                                onOk: () => {
                                  bannerDelete(record?.id);
                                },
                                okText: "Ha",
                                cancelText: "Yo'q",
                              });
                            }}
                          />
                        ),
                      },
                    ],
                  }}
                >
                  <Button size="small" icon={<MoreOutlined />} />
                </Dropdown>
              </Flex>
            ),
          },
        ]}
        pagination={{
          size: "default",
          pageSizeOptions: [5, 10, 20, 50, 75, 100],
          showTotal: (total) => (
            <span className="text-base font-semibold">Jami: {total}</span>
          ),
          position: ["bottomCenter"],
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: limit,
          current: currentPage,
          total: data?.count,
          onChange: (page) => {
            setCurrentPage(page);
          },
          onShowSizeChange: (current, size) => {
            setLimit(size);
            setCurrentPage(current);
          },
        }}
      />

      <Modal
        title="Banner Qo'shish"
        open={isModalOpen}
        footer={false}
        maskClosable={true}
        onCancel={() => setIsModalOpen(false)}
        loading={isPending || updatePending}
        width={900}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setIsModalOpen(false);
            if (isEdit) {
              bannerUpdate({ currentId, ...values });
            } else {
              bannerCreate(values);
            }
          }}
        >
          <Form.Item label="Rasm" name="img_url">
            <Input placeholder="Rasm URL" />
          </Form.Item>
          <Form.Item label="URL" name="url">
            <Input placeholder="URL" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Banner batafsil ma'lumotlar"
        open={isModalView}
        footer={false}
        maskClosable={false}
        onCancel={() => setIsModalView(false)}
        loading={editDataLoading}
        width={900}
        centered
      >
        <Flex vertical gap={12}>
          <img src={editData?.img_url} alt="Banner" />
          <Flex direction="column" gap={12}>
            <h1 className="text-lg font-bold">Banner URL:</h1>
            <p className="text-base">
              <a href={editData?.url} target="_blank">
                {editData?.url}
              </a>
            </p>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
