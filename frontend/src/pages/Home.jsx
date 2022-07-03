import { useEffect } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Workout, WorkoutForm } from "../components";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
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
