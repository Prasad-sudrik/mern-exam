import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Test() {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  let a = new Map();
  const [answers, setAnswers] = useState(a);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  // const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchTest = async () => {
      console.log("Running use Effect");
      try {
        setLoading(true);

        const response = await fetch(`/api/test/get/${params.testId}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setTest(data);
        console.log("qid in data is" + typeof data.questions[0]._id);
        console.log("option in data is" + typeof data.questions[0].options[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTest();
  }, [params.testId]);
  console.log(test);
  const colors = [
    "bg-orange-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-slate-500",
  ];
  const selectedColor = "bg-fuchsia-400";
  const handleAnswerChange = (questionId, selectedOption) => {
    console.log("changing answers " + questionId + "..." + selectedOption);
    // setAnswers((prevAnswers) => ({
    //   ...prevAnswers,
    //   [questionId]: selectedOption,
    // }));
    setAnswers((prevItemsMap) => {
      const newItemsMap = new Map(prevItemsMap);
      newItemsMap.set(questionId, selectedOption);
      return newItemsMap;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let arrayOfObjects = Array.from(answers, ([questionId, user_answer]) => ({
      questionId,
      user_answer,
    }));
    const testId = params.testId;
    const userId = currentUser._id;
    const formData = {
      userRef: userId,
      testRef: testId,
      userAnswers: [...arrayOfObjects],
    };
    console.log(arrayOfObjects);
    setLoading(true);
    setError(false);
    const res = await fetch("/api/submittest/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.success == false) {
      setError(data.message);
    }
    // navigate(`/home}`);
  };
  console.log(answers);
  // const [test, setTest] = useState({
  //   exam: "Unit Test 1",
  //   subject: "Science",
  //   start_time: new Date(),
  //   end_time: new Date(),
  //   questions_answered: 1,
  //   totalQuestions: 1,
  //   questions: [
  //     {
  //       id: "1",
  //       question: "What is the capital of India?",
  //       options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
  //       answer: "Delhi",
  //     },
  //     {
  //       id: 2,
  //       question: "Which planet is known as the Red Planet?",
  //       options: ["Mars", "Venus", "Jupiter", "Saturn"],
  //       answer: "Mars",
  //     },
  //   ],
  // });
  return (
    <>
      {loading && <p className=" text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center hello my-7 text-2xl">{error}</p>}
      {test && !loading && !error && (
        <div className="text-center p-3  flex flex-col items-center">
          <div className="flex  flex-col gap-2 w-full items-center ">
            <div className="grid grid-cols-2 gap-4 w-full ">
              <div className="text-xl md:text-3xl sm:text-2xl text-slate-700">
                <span>Exam: </span>
                {test.exam}
              </div>
              <div className="text-xl md:text-3xl sm:text-2xl text-slate-700">
                <span>Subject: </span>
                {test.subject}
              </div>
              <div className="text-xl md:text-3xl sm:text-2xl  text-slate-700">
                <span>Start Time: </span>
                {new Date(test.start_time).toTimeString().slice(0, 5)}
                {/* {test.start_time.toTimeString().slice(0, 5)} */}
              </div>
              <div className="text-xl md:text-3xl sm:text-2xl  text-slate-700">
                <span>End Time: </span>
                {new Date(test.end_time).toTimeString().slice(0, 5)}
                {/* {test.end_time.toTimeString().slice(0, 5)} */}
              </div>
              <div className="text-xl md:text-3xl sm:text-2xl text-slate-700">
                <span>Questions Answered :</span>
                {answers.length} / {test.questions.length}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-2 w-full"
            >
              {test.questions.map((question, j) => (
                <div
                  key={question._id}
                  className="text-3xl text-slate-700 w-4/5"
                >
                  <span>Question: </span>
                  {question.question}
                  <div className="grid gap-2 md:grid-cols-2 mt-5 sm:grid-cols-1">
                    {question.options.map((option, i) => (
                      <div
                        key={j.toString() + i.toString()}
                        // className={` flex justify-between items-center h-fit p-0 m-0 text-black rounded-lg overflow-hidden ${
                        //   answers[question._id] == option
                        //     ? selectedColor
                        //     : "bg-white"
                        // } shadow-white`}
                        className={`${
                          answers.get(question._id) == option
                            ? selectedColor
                            : "bg-white"
                        } flex justify-between items-center h-fit p-0 m-0 text-black rounded-lg overflow-hidden shadow-white`}
                      >
                        <span
                          className={`${colors[
                            i
                          ].toString()} p-2 h-10 w-10 flex items-center`}
                        >
                          {String.fromCharCode(i + 65)}
                        </span>
                        <span
                          onClick={() =>
                            handleAnswerChange(question._id, option)
                          }
                          className={` w-full  h-full`}
                        >
                          {option}
                        </span>
                        {/* <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  className={`${
                    answers[question.id] === option
                      ? selectedColor.toString()
                      : ""
                  }`}
                  onChange={() => handleAnswerChange(question.id, option)}
                /> */}
                      </div>
                    ))}
                    {/* <div className="flex justify-between items-center h-fit bg-white text-black">
              <span className="p-2 h-10 w-10 flex items-center bg-green-400 ">
                B
              </span>
              <span className="w-full">Delhi</span>
            </div>
            <div className="flex justify-between items-center h-fit bg-white text-black">
              <span className="p-2 h-10 w-10 flex items-center bg-blue-400 ">
                C
              </span>
              <span className="w-full">Delhi</span>
            </div>
            <div className="flex justify-between items-center h-fit bg-white text-black">
              <span className="p-2 h-10 w-10 flex items-center bg-indigo-400 ">
                D
              </span>
              <span className="w-full">Delhi</span>
            </div> */}
                  </div>
                </div>
              ))}
              <button className="rounded-lg border-sky-700 border-4 bg-sky-200 p-3 m-2 text-xl font-semibold">
                Submit Test
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
