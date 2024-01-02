import { useState } from "react";

const TestForm = () => {
  const [formData, setFormData] = useState({
    exam: "",
    subject: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: 1 }],
  });
  const [formErrors, setFormErrors] = useState({
    exam: "",
    subject: "",
    questions: [{ question: "", options: ["", "", ""], answer: "" }],
  });

  const handleChange = (event, questionIndex, optionIndex) => {
    const { name, value } = event.target;
    if (name.includes("questions")) {
      const newQuestions = [...formData.questions];
      const property = name.split(".")[2];

      if (property === "options") {
        // Ensure 'options' is always an array before updating
        newQuestions[questionIndex][property] = Array.isArray(
          newQuestions[questionIndex][property]
        )
          ? newQuestions[questionIndex][property]
          : [];

        newQuestions[questionIndex][property][optionIndex] = value;
      } else {
        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          [property]: value,
        };
      }

      setFormData({ ...formData, questions: newQuestions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", options: ["", "", "", ""], answer: 1 },
      ],
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(questionIndex, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.push("");
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your onSubmit function with formData
    formData.questions.forEach((question) => {
      //   if (question.options.length < 4) {
      //     alert("Please add at least 4 options for each question.");
      //     return;
      //   }
      const newFormErrors = {
        exam: formData.exam.trim() === "" ? "Exam field is required" : "",
        subject:
          formData.subject.trim() === "" ? "Subject field is required" : "",
        questions: formData.questions.map((question, index) => ({
          question:
            question.question.trim() === ""
              ? `Question ${index + 1} is required`
              : "",
          answer:
            question.answer.trim() === ""
              ? `Answer for Question ${index + 1} is required`
              : "",
          options: question.options.map((option, optionIndex) =>
            option.trim() === ""
              ? `Option ${optionIndex + 1} for Question ${
                  index + 1
                } is required`
              : ""
          ),
        })),
      };
      setFormErrors(newFormErrors);
      //   if (+question.answer > question.options.length) {
      //   }
      if (!Object.values(newFormErrors).some((error) => error !== "")) {
        // Perform your form submission logic here
        console.log("Form Submitted:", formData);
      }
    });
    console.log(formData);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>
    //       Exam:
    //       <input
    //         type="text"
    //         name="exam"
    //         value={formData.exam}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Subject:
    //       <input
    //         type="text"
    //         name="subject"
    //         value={formData.subject}
    //         onChange={handleChange}
    //         required
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>Questions:</label>
    //     {formData.questions.map((question, questionIndex) => (
    //       <div key={questionIndex}>
    //         <div>
    //           <label>
    //             Question:
    //             <input
    //               type="text"
    //               name={`questions.${questionIndex}.question`}
    //               value={question.question}
    //               onChange={(e) => handleChange(e, questionIndex)}
    //               required
    //             />
    //           </label>
    //         </div>
    //         <div>
    //           <label>
    //             Correct Answer:
    //             <input
    //               type="number"
    //               name={`questions.${questionIndex}.answer`}
    //               value={question.answer}
    //               onChange={(e) => handleChange(e, questionIndex)}
    //               placeholder="Enter the correct Option Number"
    //               required
    //             />
    //           </label>
    //         </div>
    //         <div>
    //           <label>Options:</label>
    //           {question.options.map((option, optionIndex) => (
    //             <div key={optionIndex}>
    //               <input
    //                 type="text"
    //                 name={`questions.${questionIndex}.options.${optionIndex}`}
    //                 value={option}
    //                 onChange={(e) =>
    //                   handleChange(e, questionIndex, optionIndex)
    //                 }
    //                 required
    //               />
    //               <button
    //                 type="button"
    //                 onClick={() =>
    //                   handleRemoveOption(questionIndex, optionIndex)
    //                 }
    //               >
    //                 Remove Option
    //               </button>
    //             </div>
    //           ))}
    //           <button
    //             type="button"
    //             onClick={() => handleAddOption(questionIndex)}
    //           >
    //             Add Option
    //           </button>
    //         </div>
    //         <button
    //           type="button"
    //           onClick={() => handleRemoveQuestion(questionIndex)}
    //         >
    //           Remove Question
    //         </button>
    //       </div>
    //     ))}
    //     <button type="button" onClick={handleAddQuestion}>
    //       Add Question
    //     </button>
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Exam:
          <input
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              formErrors.exam ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.exam && (
            <p className="text-red-500 text-sm mt-1">{formErrors.exam}</p>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              formErrors.subject ? "border-red-500" : ""
            }`}
            required
          />
          {formErrors.subject && (
            <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Questions:
        </label>
        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question:
                <input
                  type="text"
                  name={`questions.${questionIndex}.question`}
                  value={question.question}
                  onChange={(e) => handleChange(e, questionIndex)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Correct Answer:
                <input
                  type="number"
                  name={`questions.${questionIndex}.answer`}
                  value={question.answer}
                  onChange={(e) => handleChange(e, questionIndex)}
                  placeholder="Enter the correct Option Number"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Options:
              </label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex mb-2">
                  <input
                    type="text"
                    name={`questions.${questionIndex}.options.${optionIndex}`}
                    value={option}
                    onChange={(e) =>
                      handleChange(e, questionIndex, optionIndex)
                    }
                    className={`mt-1 p-2 flex-1 border rounded-md mr-2 ${
                      formErrors.questions[questionIndex]?.options[optionIndex]
                        ? "border-red-500"
                        : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveOption(questionIndex, optionIndex)
                    }
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Remove Option
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddOption(questionIndex)}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add Option
              </button>
              {formErrors.questions[questionIndex]?.options &&
                formErrors.questions[questionIndex].options.map(
                  (error, optionIndex) => (
                    <p key={optionIndex} className="text-red-500 text-sm mt-1">
                      {error}
                    </p>
                  )
                )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveQuestion(questionIndex)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Add Question
        </button>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default TestForm;
