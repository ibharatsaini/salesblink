import Agenda from "agenda";
import transporter from "./mailer";

const MONGODB_URL = process.env.MONGODB_URL!
const SENDER = process.env.EMAIL_SENDER!



const agenda = new Agenda({ db: { address: MONGODB_URL, collection: 'jobs' } });

agenda.define('send email', async (job:any) => {
  const { recipient, subject, body, currentDelay } = job.attrs.data;
  console.log(`Recipient ,`,recipient,subject,body,currentDelay,new Date(currentDelay))

  try {
    await transporter.sendMail({
      from: SENDER,
      to: recipient,
      subject,
      text: body,
    });
    console.log(`Initial email sent to ${recipient}`);
  } catch (error) {
    console.log(error)
    console.error(`Error sending initial email to ${recipient}:`, error);
  }
});

export default agenda