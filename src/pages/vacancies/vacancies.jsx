import React from "react";
import { VacancyCard } from "../../components/vacancies-card/vacancies-card";
import { VacanciesList } from "../../components/vacancies-list/vacancies-list";

export const Vacancies = () => {
  return (
    <div>
      Vacancies
      <div>
        <VacanciesList />
      </div>
    </div>
  );
};
