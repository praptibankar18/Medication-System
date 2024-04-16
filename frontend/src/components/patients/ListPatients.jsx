import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const ListPatients = () => {
  const [patients, setPatients] = useState([]);
  const practitioner_id = Cookies.get("practitioner_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/patients/get-patient-by-practitioners-id/${practitioner_id}`
        );
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [practitioner_id]);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = patients.filter(
      (patient) =>
        `${patient.first_name} ${patient.last_name}`
          .toLowerCase()
          .includes(searchTerm) || patient.phone_number.includes(searchTerm)
    );
    setFilteredPatients(filtered);
  };

  return (
    <>
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6"></div>
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <Link to={`/add-patient/${practitioner_id}`} className="inline-flex p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
            >
              <path
                strokeLinecap="round"
                sstrokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Patient
          </Link>
        </div>
      </div>

      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                <div className="flex">
                  <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                    <svg
                      width="18"
                      height="18"
                      className="w-4 lg:w-auto"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                        stroke="#455A64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.9993 16.9993L13.1328 13.1328"
                        stroke="#455A64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-purple-500 tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Fullname
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredPatients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm leading-5 text-gray-800">
                          {patient.patient_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-purple-900">
                      {patient.first_name + " " + patient.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-purple-900 border-gray-500 text-sm leading-5">
                    {calculateAge(patient.date_of_birth)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-purple-900 border-gray-500 text-sm leading-5">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-purple-900 border-gray-500 text-sm leading-5">
                    {patient.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-purple-900 text-sm leading-5">
                    {patient.address}, {patient.city}
                  </td>
                  <td className="py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <Link
                      to={`/view-Patient/${patient.patient_id}`}
                      className="px-2 mr-1 py-2 border-purple-500 border text-purple-500 rounded transition duration-300 hover:bg-purple-700 hover:text-white focus:outline-none"
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/view-medications/${patient.patient_id}`}
                      className="px-2 py-2 border-purple-500 border text-purple-500 rounded transition duration-300 hover:bg-purple-700 hover:text-white focus:outline-none"
                    >
                      View Medications
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListPatients;
