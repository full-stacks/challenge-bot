const { sendQuizHof } = require('../../hof');
const { createCronJob } = require('../../util/functions');

const handler = (ctx) => {
  const { id, quizTime } = ctx.chat;
  ctx.session.jobs = ctx.session.jobs || {};

  if (id in ctx.session.jobs) {
    ctx.session.jobs[id].stop();
  }
  const callback = sendQuizHof(id, ctx);
  const job = createCronJob(quizTime, callback); //NOTE this function also runs the job
  Object.assign(ctx.session.jobs, { [id]: job });
};

module.exports = handler;