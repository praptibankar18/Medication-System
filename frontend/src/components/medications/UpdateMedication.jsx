import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateMedication = () => {
  const [medication, setMedication] = useState(null);
  const { medication_id } = useParams();
  let patientId;

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/medications/get-medication-by-medication-id/${medication_id}`
        );
        const {
          patient_id,
          medication_name,
          dosage,
          frequency,
          instructions,
          start_date,
          end_date,
        } = response.data;

        // console.log(patient_id)

        setMedication({
          patient_id,
          medication_name,
          dosage,
          frequency,
          instructions,
          start_date: formatDate(start_date), // Format dates before setting them in state
          end_date: formatDate(end_date),
        });

      } catch (error) {
        console.error("Error fetching medication:", error);
      }
    };

    fetchMedication();
  }, [medication_id]);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
  };


  const [formData, setFormData] = useState({
    medication_name: "",
    dosage: "",
    frequency: "",
    instructions: "",
    start_date: "",
    end_date: "",
  });

  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      for (const key in formData) {
        if (formData[key] !== medication[key]) {
          payload[key] = formData[key];
        }
      }
      await axios.put(
        `http://localhost:4000/api/medications/update-medication/${medication_id}`,
        payload
      );
      navigate(`/view-medications/${medication.patient_id}`);
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Medication Details
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Medication Information
                </h6>
                {medication && (
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="medication_name"
                        >
                          Medication Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300  text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="medication_name"
                          defaultValue={medication.medication_name}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="dosage"
                        >
                          Dosage
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="dosage"
                          defaultValue={medication.dosage}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="frequency"
                        >
                          Frequency
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="frequency"
                          defaultValue={medication.frequency}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="instructions"
                        >
                          Instructions
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="instructions"
                          defaultValue={medication.instructions}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="start_date"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="start_date"
                          defaultValue={medication.start_date}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="end_date"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-black font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          id="end_date"
                          defaultValue={medication.end_date}
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-start justify-end -mb-3">
                  <button
                    type="submit"
                    className="inline-flex p-2 px-5 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                  >
                    Update Medication
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMedication;
