import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ViewPatient = () => {
  const [patient, setPatient] = useState(null);
  const { patient_id } = useParams();
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/patients/get-patient-by-patient-id/${patient_id}`
        );
        const {
          first_name,
          last_name,
          date_of_birth,
          gender,
          phone_number,
          email,
          address,
          city,
          state,
          country,
          zipcode,
        } = response.data;

        // Convert the date_of_birth string to a Date object
        const dateOfBirth = new Date(date_of_birth);

        setPatient({
          first_name,
          last_name,
          date_of_birth: dateOfBirth.toISOString().split("T")[0],
          gender,
          phone_number,
          email,
          address,
          city,
          state,
          country,
          zipcode,
        });
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [patient_id]);

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Patient Details
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Patient Information
                </h6>
                {patient && (
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="first_name"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300  text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="first_name"
                          value={patient.first_name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="last_name"
                          value={patient.last_name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="date_of_birth"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="date_of_birth"
                          value={patient.date_of_birth}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="gender"
                        >
                          Gender
                        </label>
                        <select
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="gender"
                          value={patient.gender}
                          disabled
                        >
                          <option value="">Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="phone_number"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="phone_number"
                          value={patient.phone_number}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="email"
                          value={patient.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="address"
                          value={patient.address}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="city"
                          value={patient.city}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="state"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="state"
                          value={patient.state}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="zipcode"
                        >
                          Zipcode
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="zipcode"
                          value={patient.zipcode}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-purple-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="country"
                          value={patient.country}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-start justify-end -mb-3">
                  <Link
                    to={`/view-medications/${patient_id}`}
                    className="px-2 mr-1 py-2 border-purple-500 border text-purple-500 rounded transition duration-300 hover:bg-purple-700 hover:text-white focus:outline-none"
                  >
                    View Medications
                  </Link>
                  <Link
                    to={`/edit-patient/${patient_id}`}
                    className="inline-flex p-2 px-5 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                  >
                    Click To Edit
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewPatient;
