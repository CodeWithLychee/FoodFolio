import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  const getComplaints = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const response = await fetch(`http://localhost:3000/api/complaint/hostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel }),
    });

    const data = await response.json();
    if (data.success) {
      const complaints = [];
      data.complaints.map((complaint) => {
        let date = new Date(complaint.date);
        complaints.unshift({
          id: complaint._id,
          type: complaint.type,
          title: complaint.title,
          desc: complaint.description,
          student: complaint.student.name,
          room: complaint.student.room_no,
          status: complaint.status,
          date: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        });
      });
      setAllComplaints(complaints);
      setResolvedComplaints(
        complaints.filter(
          (complaint) => complaint.status.toLowerCase() !== "pending"
        )
      );
      setUnsolvedComplaints(
        complaints.filter(
          (complaint) => complaint.status.toLowerCase() === "pending"
        )
      );
    } else {
      toast.error("Failed to fetch complaints");
    }
  };

  const dismissComplaint = async (id, action) => {
    const response = await fetch(
      `http://localhost:3000/api/complaint/${action}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    if (data.success) {
      toast.success(
        `Complaint ${action === "resolve" ? "Solved" : "Rejected"}`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
      setUnsolvedComplaints(
        unsolvedComplaints.filter((complaint) => complaint.id !== id)
      );
      setResolvedComplaints(
        resolvedComplaints.concat(
          allComplaints.find((complaint) => complaint.id === id)
        )
      );
    } else {
      toast.error("Something went wrong");
    }
  };

  const [unsolvedComplaints, setUnsolvedComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getComplaints();
    const dates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      new Date(Date.now()).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    ];

    setGraphData(
      dates.map(
        (date) =>
          allComplaints.filter((complaint) => complaint.date === date).length
      )
    );
  }, [allComplaints]);

  const toggleComplaintExpansion = (id) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 pt-20 items-center justify-center bg-gray-900 text-white overflow-auto">
      <h1 className="font-bold text-4xl">Complaints Dashboard</h1>
      Graph
      <div className="w-full max-w-4xl bg-black rounded-lg p-5 shadow-lg mt-[1200px]">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Complaints Trend (Last 7 Days)
        </h2>
        <Line
          data={{
            labels: [
              "6 Days Ago",
              "5 Days Ago",
              "4 Days Ago",
              "3 Days Ago",
              "2 Days Ago",
              "Yesterday",
              "Today",
            ],
            datasets: [
              {
                label: "No. of Complaints",
                data: graphData,
                borderColor: "orange",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            responsive: true,
          }}
        />
      </div>
      {/* Complaints List */}
      <div className="w-full max-w-4xl bg-black rounded-lg p-5 shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          New Complaints
        </h2>
        <ul role="list" className="divide-y divide-gray-700">
          {unsolvedComplaints.length === 0 ? (
            <p className="text-gray-400 text-center">No new complaints!</p>
          ) : (
            unsolvedComplaints.map((complaint) => (
              <li
                key={complaint.id}
                className="py-4 px-4 hover:bg-gray-800 rounded-lg transition"
                onClick={() => toggleComplaintExpansion(complaint.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">{complaint.title}</p>
                    <p className="text-sm text-gray-400">{complaint.date}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 transform ${
                      expandedComplaint === complaint.id
                        ? "rotate-180"
                        : "rotate-0"
                    } transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {expandedComplaint === complaint.id && (
                  <div className="mt-3 bg-gray-800 rounded-lg p-4">
                    <p>{complaint.desc}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Room: {complaint.room}, Student: {complaint.student}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() =>
                          dismissComplaint(complaint.id, "resolve")
                        }
                        className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        Solved
                      </button>
                      <button
                        onClick={() => dismissComplaint(complaint.id, "reject")}
                        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
    </div>
  );
}

export default Complaints;
