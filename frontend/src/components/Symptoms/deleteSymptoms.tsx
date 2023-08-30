import { instance } from "../../api/axios";
import { useState } from "react";

export const deleteSymptom = async (
  id: number
  
) => {
  const [symptomsList, setSymptomsList] = useState([]);
  try {
    await instance.delete(`/symptoms/delete/${id}`);
    setSymptomsList(() => symptomsList.filter((item) => item.id !== id));
  } catch (error) {
    console.log(error);
  }
};
