import React from "react";
import { CreateCitiesForm } from "../../components/cities/create-cities-form";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CreateCities = () => {
  return (
    <>
      <Flex vertical align="center" justify="center" gap={24}>
        <Flex className="w-full">
          <Link to={`/admin/cities`}>
            <Button icon={<ArrowLeftOutlined />} type="primary">
              ortga
            </Button>
          </Link>
        </Flex>
        <CreateCitiesForm />
      </Flex>
    </>
  );
};
