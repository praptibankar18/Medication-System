import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ViewMedications = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { patient_id } = useParams();
  const practitioner_id = Cookies.get("practitioner_id");

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/medications/get-medication-by-patient-id/${patient_id}`
        );
        setMedications(response.data);
        setFilteredMedications(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [patient_id]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = medications.filter(
      (medication) =>
        medication.medication_name.toLowerCase().includes(searchTerm) ||
        medication.dosage.toLowerCase().includes(searchTerm) ||
        medication.frequency.toLowerCase().includes(searchTerm) ||
        medication.instructions.toLowerCase().includes(searchTerm)
    );
    setFilteredMedications(filtered);
  };

  const handleDelete = async (medicationId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/medications/delete-medication/${medicationId}`
      );
      setMedications(
        medications.filter(
          (medication) => medication.medication_id !== medicationId
        )
      );
      setFilteredMedications(
        filteredMedications.filter(
          (medication) => medication.medication_id !== medicationId
        )
      );
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6"></div>
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <Link
            to={`/add-medication/${patient_id}`}
            className="inline-flex p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Medication
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.9993 16.9993L13.1328 13.1328"
                        stroke="#455A64"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  Medication Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Dosage
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Instructions
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-purple-500 tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredMedications.map((medication) => (
                <tr key={medication.medication_id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {medication.medication_name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {medication.dosage}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {medication.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {medication.instructions}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {formatDate(medication.start_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {formatDate(medication.end_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500">
                    <button
                      onClick={() => handleDelete(medication.medication_id)}
                      className="px-2 mr-1 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-medication/${medication.medication_id}`}
                      className="px-2 mr-1 py-2 border-purple-500 border text-purple-500 rounded transition duration-300 hover:bg-purple-700 hover:text-white focus:outline-none"
                    >
                      Edit
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

export default ViewMedications;
