import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [location, setLocation] = useState("Hyderabad");
  const [level, setLevel] = useState("Intermediate");
  const [salary, setSalary] = useState(0);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Initialize Quill Editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write job description here...",
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setDescription(html);
      });
    }
  }, []);

  const addJobPostSubmitHandler = async (e) => {
    e.preventDefault();

    // Prevent submitting empty description
    if (!description || description === "<p><br></p>") {
      toast.error("Description is required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, category, location, level, salary },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success("Job posted successfully!");

        // Reset form fields
        setTitle("");
        setDescription("");
        setCategory("Programming");
        setLocation("Hyderabad");
        setLevel("Intermediate");
        setSalary(0);

        if (quillRef.current) quillRef.current.setContents([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error posting the job.");
    }
  };

  return (
    <section className="pl-2 pt-2">
      <form onSubmit={addJobPostSubmitHandler}>
        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
            Job Description
          </label>
          <div ref={editorRef} style={{ minHeight: "150px" }} />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Job Category */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Designing">Designing</option>
              <option value="Networking">Networking</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
            </select>
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Job Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter salary range"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
        >
          Add Job
        </button>
      </form>
    </section>
  );
};

export default AddJob;
