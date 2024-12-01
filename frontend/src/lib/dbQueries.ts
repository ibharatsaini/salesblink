import axiosInstance from "./configureAxios";

export const getSampleEmails = async () => {
  const { data } = await axiosInstance.get("api/emails/sample-email");
  console.log(data.data);
  return data.data;
};


export const addCampaign = async (postData:any)=>{
  const { data } = await axiosInstance.post("api/campaign/run-campaign",postData);
  console.log(data.data);
  return data.data;

}