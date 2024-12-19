document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-box').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // 検索結果をリセット

  if (query === '') {
    resultsDiv.innerHTML = '<p>Please enter a search query.</p>';
    return;
  }

  // サンプル検索データ
  const data = [
    { title: 'GitHub', url: 'https://github.com' },
    { title: 'Google', url: 'https://www.google.com' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
  ];

  // 検索フィルタリング
  const results = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
  } else {
    results.forEach(result => {
      const link = document.createElement('a');
      link.href = result.url;
      link.target = '_blank';
      link.textContent = result.title;
      const div = document.createElement('div');
      div.appendChild(link);
      resultsDiv.appendChild(div);
    });
  }
});
