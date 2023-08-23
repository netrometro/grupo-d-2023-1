import { instance } from "../../api/axios";

interface Symptoms {
  id: number;
  name: string;
  description: string;
  medication: string;
  startDate: string;
  endDate: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export const deleteSymptom = async (
  id: number,
  setSymptomsList: React.Dispatch<React.SetStateAction<Symptoms[]>>
) => {
  try {
    await instance.delete(`/symptoms/delete/${id}`);
    // Remove the deleted symptom from the list
    setSymptomsList((prevList) => prevList.filter((item) => item.id !== id));
  } catch (error) {
    console.log(error);
  }
};
