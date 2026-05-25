import { useState, useCallback } from "react";
import RoleSelector from "../components/RoleSelector";
import QuestionCard from "../components/QuestionCard";
import AnswerForm from "../components/AnswerForm";
import GradeResult from "../components/GradeResult";
import LoadingGrader from "../components/LoadingGrader";
import { getRandomQuestion } from "../data/questions";
import { gradeAnswer } from "../api/grade";

const S = {
  SELECT: "select",
  QUESTION: "question",
  GRADING: "grading",
  RESULT: "result",
};

export default function Practice() {
  const [stage, setStage] = useState(S.SELECT);
  const [role, setRole] = useState("");
  const [q, setQ] = useState(null);
  const [qNum, setQNum] = useState(1);
  const [ans, setAns] = useState("");
  const [grade, setGrade] = useState(null);
  const [err, setErr] = useState("");
  const [count, setCount] = useState(0);

  const pickRole = useCallback((r) => {
    setRole(r);
    setQ(getRandomQuestion(r));
    setQNum(1);
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  }, []);

  const submit = useCallback(
    async (answer) => {
      setAns(answer);
      setErr("");
      setStage(S.GRADING);
      try {
        const result = await gradeAnswer({
          question: q.question,
          answer,
          role,
        });
        setGrade(result);
        setCount((c) => c + 1);
        setStage(S.RESULT);
      } catch (e) {
        setErr(e.response?.data?.error || e.message || "Something went wrong.");
        setStage(S.QUESTION);
      }
    },
    [q, role],
  );

  const next = useCallback(() => {
    setQ(getRandomQuestion(role, q?.id));
    setQNum((n) => n + 1);
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  }, [role, q]);
  const retry = () => {
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  };
  const changeRole = () => {
    setStage(S.SELECT);
    setGrade(null);
    setErr("");
    setAns("");
  };

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12">
        {role && stage !== S.SELECT && (
          <div className="animate-fade-in flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-[10px] text-muted tracking-widest">
                {count} GRADED
              </span>
            </div>
            <button
              onClick={changeRole}
              className="font-mono text-[10px] text-muted hover:text-amber transition-colors tracking-widest"
            >
              CHANGE ROLE
            </button>
          </div>
        )}

        {stage === S.SELECT && <RoleSelector onSelect={pickRole} />}
        {stage === S.QUESTION && q && (
          <>
            <QuestionCard question={q} role={role} questionNum={qNum} />
            <AnswerForm
              onSubmit={submit}
              onSkip={next}
              onChangeRole={changeRole}
              isLoading={false}
              error={err}
            />
          </>
        )}
        {stage === S.GRADING && <LoadingGrader />}
        {stage === S.RESULT && grade && (
          <GradeResult
            grade={grade}
            answer={ans}
            onNext={next}
            onRetry={retry}
            onChangeRole={changeRole}
          />
        )}
      </div>
    </div>
  );
}
