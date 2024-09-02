"use server";

import { redirect } from "next/navigation";

const navigation = () => {
    redirect("/jobs");
};

export { navigation };
