exports.getResources = (req, res) => {
  const resources = [
    {
      id: 1,
      title: 'Benefits of Blood Donation',
      content: 'Donating blood saves lives and has health benefits for donors.'
    },
    {
      id: 2,
      title: 'Blood Donation Process',
      content: 'Learn what to expect before, during, and after donating blood.'
    },
    {
      id: 3,
      title: 'FAQs',
      content: 'Common questions and answers about blood donation and requests.'
    }
  ];
  res.json(resources);
};
