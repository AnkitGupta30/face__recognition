"use client";
import React, { useEffect, useState } from "react";
import { MdAssignment } from "react-icons/md";
import { MdBeenhere } from "react-icons/md";
import { MdControlPointDuplicate } from "react-icons/md";

interface AttendancePageProps {
  mess?: string;
  l: number;
  names: string[];
  rolls: string[];
  times: string[];
  totalreg: number;
}

const AttendencePage: React.FC<AttendancePageProps> = ({
  mess,
  l,
  names,
  rolls,
  times,
  totalreg,
}) => {
  const [attendanceData, setAttendanceData] = useState({
    names: names || [],
    rolls: rolls || [],
    times: times || [],
    l: l || 0,
  });

  const [userCount, setUserCount] = useState(totalreg || 0);

  const handleAttendence = () => {
    fetch("http://127.0.0.1:8080/start")
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData({
          names: data.names,
          rolls: data.rolls,
          times: data.times,
          l: data.l,
        });
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  };

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://127.0.0.1:8080/add", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setUserCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-white p-3 text-4xl mt-[98px] md:mt-28 lg:mt-28">
        Face Recognition System of ADGIPS via HaarCascade and LBPH
      </h1>

      {mess && <p className="text-red-500 text-xl">{mess}</p>}

      <div className="flex justify-center space-x-4 p-5 m-5 flex-col-reverse md:flex-row lg:flex-row">
        {/* leftSide  */}
        <div className="bg-black bg-opacity-80 rounded-lg p-0 m-2 min-h-[400px] flex flex-col gap-5 flex-1">
          <div className="flex items-center justify-center bg-white text-black rounded-md shadow-lg">
            <h2 className="p-2 font-bold">Today's Attendance</h2>
            <MdAssignment />
          </div>
          <div className="flex items-center justify-center rounded-md shadow-lg bg-blue-600 text-white">
            <button className="p-2" onClick={handleAttendence}>
              Take Attendance
            </button>
            <MdBeenhere />
          </div>
          <table className="bg-white w-full text-black rounded-md">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <b>S.No</b>
                </th>
                <th className="px-4 py-2">
                  <b>Name</b>
                </th>
                <th className="px-4 py-2">
                  <b>ID</b>
                </th>
                <th className="px-4 py-2">
                  <b>Time</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.l > 0 &&
                Array.from({ length: attendanceData.l }, (_, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{i + 1}</td>
                    <td className="border px-4 py-2">
                      {attendanceData.names[i]}
                    </td>
                    <td className="border px-4 py-2">
                      {attendanceData.rolls[i]}
                    </td>
                    <td className="border px-4 py-2">
                      {attendanceData.times[i]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* RightSide  */}
        <div className="bg-black bg-opacity-80 rounded-lg p-0 m-2 h-[400px] flex flex-col -mt-2 md:mt-2 lg:mt-2">
          <form onSubmit={handleAddUser}>
            <div className="flex items-center justify-center bg-white text-black rounded-md shadow-lg">
              <h2 className="p-2 font-bold">Add New User</h2>
              <MdControlPointDuplicate className="h-5 w-5 font-bold" />
            </div>
            <div className="flex items-center justify-center flex-col gap-4">
              <div className="flex items-center justify-center gap-4 mt-5 flex-col md:flex-row lg:flex-row">
                <label className="text-white text-lg">
                  <b>Enter New User Name*</b>
                </label>
                <input
                  type="text"
                  id="newusername"
                  name="newusername"
                  className="text-black p-2 rounded-md shadow-md ring-1 outline-none bg-slate-300 md:w-60 lg:w-60 w-72"
                  required
                />
              </div>
              <div className="flex justify-center items-center gap-4 flex-col md:flex-row lg:flex-row">
                <label className="text-white text-lg">
                  <b>Enter New User Id*</b>
                </label>
                <input
                  type="number"
                  id="newuserid"
                  name="newuserid"
                  className="text-black p-2 rounded-md shadow-md ring-1 outline-none md:ml-9 lg:ml-9 bg-slate-300 md:w-60 lg:w-60 w-72"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-600 w-full text-white rounded-md shadow-md ring-1 md:mt-12 lg:mt-12 mt-10 outline-none"
            >
              Add New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendencePage;