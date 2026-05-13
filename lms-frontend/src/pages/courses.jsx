import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Add course
  const addCourse = async () => {
    if (!name) return alert("Enter course name");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      // Update UI instantly
      setCourses([...courses, data]);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div>
      <h2>📚 Courses</h2>

      {/* ✅ Add Course Form */}
      <input
        type="text"
        placeholder="Enter course name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addCourse}>Add Course</button>

      {/* ✅ Course List */}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{course.name}</h4>
            <button>Enroll</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Courses;