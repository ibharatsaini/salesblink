import axiosInstance from "./configureAxios";

export const getSampleEmails = async () => {
  const { data } = await axiosInstance.get("api/emails/sample-email");
  return data.data;
};


