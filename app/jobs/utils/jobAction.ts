import prisma from "@/prisma/prismaClient";
import s3 from "@/aws-config";

const fetchJobs = async (page: number, limit: number) => {
    await prisma.$connect();
    const jobList = await prisma.jobReferral.findMany({
        include: {
            createdBy: {
                select: {
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    return jobList;
};

const uploadJobImage = async (files: any[]) => {
    try {
        const uploadFile = async (file: any) => {
            const params: any = {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
                Key: `${Date.now()}_${file.name}`,
                Body: file,
                ContentType: file.type,
                ACL: "public-read",
            };

            try {
                const { Location } = await s3.upload(params).promise();
                return Location;
            } catch (error) {
                throw new Error("Error while uploading image file.");
            }
        };

        const uploadedFiles = [];

        // Upload files sequentially
        for (const file of files) {
            const uploadedFileUrl = await uploadFile(file);
            uploadedFiles.push(uploadedFileUrl);
        }

        return { status: true, data: uploadedFiles };
    } catch (err) {
        console.error(err);
        return {
            status: false,
            message: "Error while uploading image files, Please try again",
        };
    }
};

export { fetchJobs, uploadJobImage };
