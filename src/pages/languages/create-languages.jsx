import React from "react";
import { CreateLanguagesForm } from "../../components/languages/create-languages-form";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CreateLanguages = () => {
  return (
    <>
      <Flex vertical align="center" justify="center" gap={24}>
        <Flex className="w-full">
          <Link to={"/admin/languages"}>
            <Button icon={<ArrowLeftOutlined />} type="primary">
              ortga
            </Button>
          </Link>
        </Flex>
        <CreateLanguagesForm />
      </Flex>
    </>
  );
};
