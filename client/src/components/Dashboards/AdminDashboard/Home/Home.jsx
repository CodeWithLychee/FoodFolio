import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAllStudents } from "../../../../utils";
import { toast } from "react-toastify";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const [noOfStudents, setNoOfStudents] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const getStudentCount = async () => {
    const res = await getAllStudents();
    if (res.success) {
      setNoOfStudents(res.students.length);
    }
  };

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
      setComplaints(data.complaints);
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const getSuggestions = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const response = await fetch(
      "http://localhost:3000/api/suggestion/hostel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: hostel._id }),
      }
    );

    const data = await response.json();
    if (data.success) {
      setSuggestions(
        data.suggestions.filter((suggestion) => suggestion.status === "pending")
      );
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const getRequests = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("http://localhost:3000/api/messoff/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        (req.title = `${req.student.name} [ Room: ${req.student.room_no}]`),
          (req.desc = `${req.from} to ${req.to}`);
      });
      setMessReqs(data.list);
    }
  };

  function transformApiData(apiData) {
    const complaints = apiData || [];
    const complaintMap = new Map();

    complaints.forEach((complaint) => {
      const date = new Date(complaint.date);
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD for consistency
      complaintMap.set(
        formattedDate,
        (complaintMap.get(formattedDate) || 0) + 1
      );
    });

    const today = new Date();
    const last10Days = [];

    // Generate the last 10 days
    for (let i = 9; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      last10Days.push(formattedDate);
    }

    // Map through the last 10 days and get the complaint count
    const transformedData = last10Days.map((date) => ({
      name: date,
      DailyComplaints: complaintMap.get(date) || 0, // Set 0 if no complaints
    }));

    return transformedData;
  }

  useEffect(() => {
    getRequests();
    getStudentCount();
    getComplaints();
    getSuggestions();
  }, []);

  const [messReqs, setMessReqs] = useState([]);

  const suggestionIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const data = transformApiData(complaints);
  const graph = (
    <ResponsiveContainer
      width="100%"
      height="85%"
      className={
        "bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full max-w-[350px] max-h-96"
      }
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          bottom: 15,
          left: -25,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <Legend verticalAlign="top" height={36} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="DailyComplaints"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{admin.name || "admin"}!</span>
      </h1>
      <h1 className="text-white text-xl">Manager, {hostel.name || "hostel"}</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={noOfStudents} />
        <ShortCard title="Total Complaints" number={complaints.length} />
        <ShortCard title="Total Suggestions" number={suggestions.length} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        {graph}
        <List list={suggestions} title="suggestions" icon={suggestionIcon} />
      </div>
    </div>
  );
}

export default Home;
