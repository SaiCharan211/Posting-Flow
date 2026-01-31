"use client";

import { useState } from "react";

export default function RequirementForm() {
  const [step, setStep] = useState(1);

  const initialForm = {
    eventName: "",
    eventType: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    hireType: "",
    plannerDetails: {} as any,
    performerDetails: {} as any,
    crewDetails: {} as any,
  };

  const [form, setForm] = useState(initialForm);

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep1 = () => {
    const { eventName, eventType, startDate, endDate, location } = form;
    if (!eventName || !eventType || !startDate || !endDate || !location) {
      alert("Please fill in all mandatory fields");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.hireType) {
      alert("Please select a hire type");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (
      (form.hireType === "planner" && !form.plannerDetails.budget) ||
      (form.hireType === "performer" &&
        (!form.performerDetails.performerType || !form.performerDetails.genre)) ||
      (form.hireType === "crew" &&
        (!form.crewDetails.crewType || !form.crewDetails.numberOfPeople))
    ) {
      alert("Please fill in all mandatory fields");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL ;
    const res = await fetch(`${baseUrl}/api/requirements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Requirement posted");
      setForm(initialForm);
      setStep(1);
    }
    else alert("Failed");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Post Requirement</h2>
          <p className="text-blue-100 mt-2">Step {step} of 3</p>
        </div>

        <div className="p-8">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <div className="space-y-4 animate-fadeIn">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name <span className="text-red-500">*</span></label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Event Name"
                    onChange={(e) => update("eventName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type <span className="text-red-500">*</span></label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Event Type"
                    onChange={(e) => update("eventType", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      type="date"
                      onChange={(e) => update("startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      type="date"
                      onChange={(e) => update("endDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Location"
                    onChange={(e) => update("location", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Venue (optional)"
                    onChange={(e) => update("venue", e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                  onClick={() => validateStep1() && setStep(2)}
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hire Type <span className="text-red-500">*</span></label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    onChange={(e) => update("hireType", e.target.value)}
                    value={form.hireType}
                  >
                    <option value="">Select Hire Type</option>
                    <option value="planner">Event Planner</option>
                    <option value="performer">Performer</option>
                    <option value="crew">Crew</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    className="w-1/3 bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="w-2/3 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                    onClick={() => validateStep2() && setStep(3)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {form.hireType === "planner" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget <span className="text-red-500">*</span></label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Budget"
                      onChange={(e) =>
                        update("plannerDetails", {
                          ...form.plannerDetails,
                          budget: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {form.hireType === "performer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Performer Type <span className="text-red-500">*</span></label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Performer Type"
                        onChange={(e) =>
                          update("performerDetails", {
                            ...form.performerDetails,
                            performerType: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Genre <span className="text-red-500">*</span></label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Genre"
                        onChange={(e) =>
                          update("performerDetails", {
                            ...form.performerDetails,
                            genre: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                {form.hireType === "crew" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crew Type <span className="text-red-500">*</span></label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Crew Type"
                        onChange={(e) =>
                          update("crewDetails", {
                            ...form.crewDetails,
                            crewType: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of People <span className="text-red-500">*</span></label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Number of People"
                        onChange={(e) =>
                          update("crewDetails", {
                            ...form.crewDetails,
                            numberOfPeople: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <button
                    className="w-1/3 bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="w-2/3 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
