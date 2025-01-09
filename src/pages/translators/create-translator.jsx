import React from "react";
import { CreateTranslatorForm } from "../../components/translators/createTranslatorForm";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CreateTranslator = () => {
  return (
    <>
      <Flex vertical gap={24}>
        <Flex className="w-full">
          <Link to={"/admin/translator"}>
            <Button icon={<ArrowLeftOutlined />} type="primary">
              ortga
            </Button>
          </Link>
        </Flex>
        <CreateTranslatorForm />
      </Flex>
    </>
  );
};
