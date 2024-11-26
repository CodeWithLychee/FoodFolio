import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Food Quality");
  const [regComplaints, setRegComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const complaintsPerPage = 5;

  const types = [
    "Food Quality",
    "Hygiene",
    "Staff Behavior",
    "Menu Variety",
    "Timeliness of Service",
    "Waste Management",
  ];

  const chngType = (e) => setType(e.target.value);
  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDesc(e.target.value);

  const registerComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);

    const student = JSON.parse(localStorage.getItem("student"));
    const complaint = {
      student: student._id,
      hostel: student.hostel,
      title,
      description: desc,
      type,
    };

    const res = await fetch("http://localhost:3000/api/complaint/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Complaint Registered Successfully!", { theme: "dark" });
      setTitle("");
      setDesc("");
      setType("Food Quality");
      fetchComplaints(); // Reload complaints
    } else {
      toast.error(data.errors || "Error registering complaint", {
        theme: "dark",
      });
    }
    setLoading(false);
  };

  const fetchComplaints = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    const cmpln = { student: student._id };

    const res = await fetch("http://localhost:3000/api/complaint/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmpln),
    });

    const data = await res.json();
    const complaints = data.complaints
      .map((complaint) => ({
        ...complaint,
        date: new Date(complaint.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest date
    setRegComplaints(complaints);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const totalPages = Math.ceil(regComplaints.length / complaintsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedComplaints = regComplaints.slice(
    currentPage * complaintsPerPage,
    (currentPage + 1) * complaintsPerPage
  );

  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center px-10 max-h-screen overflow-y-auto pt-[550px]">
      <h1 className="text-white font-bold text-5xl">Mess Complaints</h1>
      <form
        onSubmit={registerComplaint}
        className="w-full md:w-1/2 py-5 px-8 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <h2 className="text-white text-2xl font-semibold">
          Register a Complaint
        </h2>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Complaint Type
          </label>
          <select
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={chngType}
          >
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <Input
          field={{
            name: "title",
            placeholder: "Title",
            req: true,
            type: "text",
            value: title,
            onChange: titleChange,
          }}
        />
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            placeholder="Details of complaint"
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={desc}
            onChange={descChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-2 text-center"
          disabled={loading}
        >
          {loading ? "Registering Complaint..." : "Register Complaint"}
        </button>
        <ToastContainer autoClose={3000} theme="dark" />
      </form>
      <div className="w-full md:w-3/4 bg-neutral-950 p-5 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-5">
          Registered Complaints
        </h2>
        <div className="space-y-3">
          {paginatedComplaints.length === 0 ? (
            <p className="text-gray-400 text-center">
              No complaints registered
            </p>
          ) : (
            paginatedComplaints.map((complain, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() =>
                  setExpandedComplaint(
                    expandedComplaint === index ? null : index
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{complain.title}</p>
                    <p className="text-gray-400 text-sm">{complain.date}</p>
                  </div>
                  <p className="text-blue-400 font-semibold">{complain.type}</p>
                </div>
                {expandedComplaint === index && (
                  <div className="mt-4 text-gray-300">
                    <p>{complain.description}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-white bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="text-white bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
