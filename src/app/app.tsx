import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ExercisesContext } from './contexts/Exercises';
import { ExerciseContext, defaultCurrentExercise } from './contexts/Exercise';
import { AuthContext } from './contexts/Auth';
import { ExamContext, defaultCurrentExam } from './contexts/Exam';
import { exerciseType, contextExercise } from 'app/shared/interfaces/exercise';
import { contextExam } from 'app/shared/interfaces/exam';

import ThemeProvider from 'app/theme';

export default function App() {
  const [exercises, setExercises] = useState<Array<exerciseType>>([]);
  const [currentExercise, setCurrentExercise] = useState<contextExercise>(
    defaultCurrentExercise,
  );
  const [auth, setAuth] = useState({
    isLogged: false,
    user: {},
  });

  const [exam, setExam] = useState<contextExam>(defaultCurrentExam);

  useEffect(() => {
    const onBeforeUnload = (ev) => {
      // eslint-disable-next-line
      ev.returnValue = 'Estás por salir del sitio.';
      return 'Estás por salir del sitio.';
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      <ExamContext.Provider value={{ exam, setExam }}>
        <ExercisesContext.Provider
          value={{
            exercises,
            setExercises,
          }}
        >
          <ExerciseContext.Provider
            value={{
              currentExercise,
              setCurrentExercise,
            }}
          >
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </ExerciseContext.Provider>
        </ExercisesContext.Provider>
      </ExamContext.Provider>
    </AuthContext.Provider>
  );
}
