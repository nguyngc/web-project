/* 
{
  FAQid
  Question
  Answer
  CreatedBy
}
*/
let faqs = [];
let nextId = 1;

const nowISO = () => new Date().toISOString();

function getAll({ q } = {}) {
  let data = [...faqs];
  if (q) {
    const kw = String(q).toLowerCase();
    data = data.filter(f =>
      f.question.toLowerCase().includes(kw) ||
      f.answer.toLowerCase().includes(kw)
    );
  }
  // newest first (fallback by id descending)
  return data.sort(
    (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime) || b.faqId - a.faqId
  );
}

function findById(id) {
  return faqs.find(f => f.faqId === Number(id)) || null;
}

function addOne(payload, creator = "api") {
  const { question, answer,createdBy } = payload || {};
  if (!question || !answer) return null;

  const faq = {
    faqId: nextId++,
    question,
    answer,
    createdBy: createdBy ?? creator,
    createdDateTime: nowISO(),
  };
  faqs.push(faq);
  return faq;
}

function updateOneById(id, data) {
  const faq = findById(id);
  if (!faq) return null;

  if (data.question !== undefined) faq.question = data.question;
  if (data.answer !== undefined) faq.answer = data.answer;
  if (data.createdBy !== undefined) faq.createdBy = data.createdBy;

  return faq;
}

function deleteOneById(id) {
  const before = faqs.length;
  faqs = faqs.filter(f => f.faqId !== Number(id));
  return faqs.length < before;
}

module.exports = { getAll, findById, addOne, updateOneById, deleteOneById };
