import { router } from "../trpc";
import { listSetsAdminProcedure, createSetAdminProcedure } from "./admin-sets";
import { getUploadUrlAdminProcedure } from "./admin-upload";
import { pushToQueueAdminProcedure } from "./admin-queue";
import { getSetQuestionsAdminProcedure } from "./admin-set-questions";

export const adminRouter = router({
  listSets: listSetsAdminProcedure,
  createSet: createSetAdminProcedure,
  getUploadUrl: getUploadUrlAdminProcedure,
  pushToQueue: pushToQueueAdminProcedure,
  getSetQuestions: getSetQuestionsAdminProcedure,
});
