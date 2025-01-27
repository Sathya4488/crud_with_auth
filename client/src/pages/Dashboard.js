import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { useMediaQuery } from "react-responsive";
import CustomDialog from "../components/CustomDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const userData = useUserContext();
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery({
    maxWidth: 639,
  });

  const fetchStudents = async () => {
    await axios
      .get("http://localhost:8080/api/students", { userId: userData.id })
      .then((res) => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filterredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteStudent = async () => {
    try {
      await axios
        .delete(`http://localhost:8080/api/students/${selectedStudentId}`)
        .then(() => fetchStudents());
    } catch (error) {
      console.log("error", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <main className="p-8 min-h-screen flex flex-col">
        <div className="flex justify-between items-center gap-x-4">
          <div className="">
            <CustomButton
              onClick={() => navigate("/addNewStudent")}
              label={isMobile ? "Add" : "Add new student"}
            />
          </div>
          <div className="flex items-center gap-x-4 relative">
            <CustomInput
              type={"text"}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Search..."}
            />
            <div className="w-5 h-5 absolute right-4 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="0.5"
                stroke="currentColor"
                className="size-6 ring-gray-300 focus:ring-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
        </div>
        {filterredStudents.length ? (
          <div className="w-[800px] overflow-x-auto mt-5 sm:w-full">
            <h1 className="text-2xl font-semibold ">Student Records</h1>
            <table className="mt-5 min-w-full">
              <thead>
                <tr className="flex gap-x-4 text-left p-4 bg-inherit">
                  <th className="text-sm text-gray-500 basis-2/12">Name</th>
                  <th className="text-sm text-gray-500 basis-3/12">Email</th>
                  <th className="text-sm text-gray-500 basis-2/12 sm:basis-3/12">
                    Enroll Number
                  </th>

                  <th className="text-sm text-gray-500 basis-2/12">
                    Department
                  </th>
                  <th className="text-sm text-gray-500 basis-1/12">Grade</th>
                  <th className="text-sm text-gray-500 basis-2/12 sm:basis-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {filterredStudents?.map((student) => (
                  <tr
                    className="rounded-md flex gap-x-4 p-4 mb-3 bg-white items-center"
                    key={student._id}
                  >
                    <td className="basis-2/12 break-all">{student.name}</td>
                    <td className="basis-3/12 break-all">{student.email}</td>
                    <td className="basis-2/12 break-all sm:basis-3/12">
                      {student.enrollNumber}
                    </td>
                    <td className="basis-2/12 break-all">
                      {student.department}
                    </td>
                    <td className="basis-1/12 break-all">{student.grade}</td>
                    <td className="flex basis-2/12 justify-end gap-x-8 col-span-2 sm:basis-1/12">
                      <button
                        onClick={() => navigate(`/student/${student._id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M18.3033 2.08777L16.9113 0.695801C16.4478 0.231934 15.8399 0 15.2321 0C14.6242 0 14.0164 0.231934 13.5525 0.69543L0.475916 13.772L0.00462689 18.0107C-0.0547481 18.5443 0.365701 19 0.88783 19C0.920858 19 0.953885 18.9981 0.987654 18.9944L5.22332 18.5265L18.3036 5.44617C19.231 4.51881 19.231 3.01514 18.3033 2.08777ZM4.67818 17.3924L1.2259 17.775L1.61035 14.3175L11.4031 4.52475L14.4747 7.59629L4.67818 17.3924ZM17.4639 4.60676L15.3141 6.7565L12.2426 3.68496L14.3923 1.53521C14.6164 1.31107 14.9148 1.1875 15.2321 1.1875C15.5494 1.1875 15.8474 1.31107 16.0719 1.53521L17.4639 2.92719C17.9266 3.39031 17.9266 4.14363 17.4639 4.60676Z"
                            className="fill-indigo-600"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setDeleteDialogOpen(true);
                          setSelectedStudentId(student._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_21_223)">
                            <path
                              d="M0.285713 2.25H4L5.2 0.675C5.35968 0.465419 5.56674 0.295313 5.80478 0.178154C6.04281 0.0609948 6.30529 0 6.57143 0L9.42857 0C9.69471 0 9.95718 0.0609948 10.1952 0.178154C10.4333 0.295313 10.6403 0.465419 10.8 0.675L12 2.25H15.7143C15.7901 2.25 15.8627 2.27963 15.9163 2.33238C15.9699 2.38512 16 2.45666 16 2.53125V3.09375C16 3.16834 15.9699 3.23988 15.9163 3.29262C15.8627 3.34537 15.7901 3.375 15.7143 3.375H15.0393L13.8536 16.4637C13.8152 16.8833 13.6188 17.2737 13.3029 17.558C12.987 17.8423 12.5745 17.9999 12.1464 18H3.85357C3.42554 17.9999 3.01302 17.8423 2.69711 17.558C2.38121 17.2737 2.18477 16.8833 2.14643 16.4637L0.960713 3.375H0.285713C0.209937 3.375 0.137264 3.34537 0.083683 3.29262C0.0301008 3.23988 0 3.16834 0 3.09375V2.53125C0 2.45666 0.0301008 2.38512 0.083683 2.33238C0.137264 2.27963 0.209937 2.25 0.285713 2.25ZM9.88571 1.35C9.8323 1.28034 9.76324 1.22379 9.68393 1.18475C9.60463 1.14572 9.51723 1.12527 9.42857 1.125H6.57143C6.48277 1.12527 6.39537 1.14572 6.31606 1.18475C6.23676 1.22379 6.1677 1.28034 6.11429 1.35L5.42857 2.25H10.5714L9.88571 1.35ZM3.28571 16.3617C3.29748 16.5019 3.36245 16.6325 3.46768 16.7277C3.57292 16.8228 3.7107 16.8754 3.85357 16.875H12.1464C12.2893 16.8754 12.4271 16.8228 12.5323 16.7277C12.6376 16.6325 12.7025 16.5019 12.7143 16.3617L13.8929 3.375H2.10714L3.28571 16.3617Z"
                              className="fill-indigo-600"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_21_223">
                              <rect
                                width="16"
                                height="18"
                                fill="white"
                                transform="matrix(-1 0 0 1 16 0)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="flex flex-grow text-2xl font-semibold items-center justify-center">
            No student records!
          </p>
        )}
      </main>
      <CustomDialog
        open={deleteDialogOpen}
        close={() => setDeleteDialogOpen(false)}
        submit={handleDeleteStudent}
        title={"Delete"}
        confirmLabel={"Delete"}
        content={"Are you sure you want to delete this student record?"}
        cancelLabel={"Cancel"}
      />
    </MainLayout>
  );
};

export default Dashboard;
