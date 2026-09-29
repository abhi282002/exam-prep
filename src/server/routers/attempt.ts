import { router } from "../trpc";
import { startAttemptProcedure } from "./attempt-start";
import { getAttemptProcedure } from "./attempt-get";
import { saveAnswerProcedure, submitAttemptProcedure } from "./attempt-actions";
import { getAttemptResultProcedure } from "./attempt-result";
import { listUserAttemptsProcedure } from "./attempt-list";

export const attemptRouter = router({
  start: startAttemptProcedure,
  get: getAttemptProcedure,
  saveAnswer: saveAnswerProcedure,
  submit: submitAttemptProcedure,
  result: getAttemptResultProcedure,
  list: listUserAttemptsProcedure,
});
