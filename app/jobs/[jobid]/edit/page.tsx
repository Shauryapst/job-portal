
import { getJobData } from "../action";
import JobForm from "../../create/JobForm";

export default async function JobEditPage() {

    return (
        <div className="m-5 flex items-center justify-center">
            <JobForm/>
        </div>
    );
}
