import { useParams } from "next/navigation";
import { getJobData } from "../action";
import JobForm from "../../create/JobForm";

export default async function JobEditPage() {
  const param = useParams();
  const jobid = param.jobid;
  const jobData = await getJobData(jobid.toString());
    return (
        <div className="m-5 flex items-center justify-center">
            <JobForm/>
        </div>
    );
}
