import React from "react";
import { VacanciesList } from "../../components/vacancies/vacancies-list";
import { Flex } from "antd";

export const Vacancies = () => {
  return (
    <Flex justify="center" className="py-2">
      <VacanciesList />
    </Flex>
  );
};
