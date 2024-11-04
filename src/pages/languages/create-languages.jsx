import React from "react";
import { CreateCitiesForm } from "../../components/create-cities-form/create-cities-form";
import { CreateLanguagesForm } from "../../components/create-languages-form/create-languages-form";

export const CreateLanguages = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* <CreateCitiesForm /> */}
        <CreateLanguagesForm/>
      </div>
    </>
  );
};
