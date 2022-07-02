import { useEffect, useState } from "react";
import { Workout, WorkoutForm } from "../components";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  return <div>
    <div className="workouts">
        {workouts && workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
        ))}
    </div>
    <WorkoutForm />
  </div>;
};
export default Home;
