import React from "react";
import { CreateCategoryForm } from "../../components/categories/create-category-form";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CreateCategory = () => {
  return (
    <>
      <Flex vertical justify="center">
        <Flex className="mb-4">
          <Link to={`/admin/categories`}>
            <Button icon={<ArrowLeftOutlined />} type="primary">
              ortga
            </Button>
          </Link>
        </Flex>
        <CreateCategoryForm />
      </Flex>
    </>
  );
};
