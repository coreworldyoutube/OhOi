// 検索機能のスクリプト
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-box').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // 検索結果をリセット

  if (query === '') {
    resultsDiv.innerHTML = '<p>Please enter a search query.</p>';
    return;
  }

  // JSONデータをフェッチ
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // クエリに一致する結果をフィルタリング
      const results = data.filter(item =>
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
      } else {
        results.forEach(result => {
          const link = document.createElement('a');
          link.href = result.url;
          link.target = '_blank';
          link.textContent = result.title;

          const description = document.createElement('p');
          description.textContent = result.description;

          const div = document.createElement('div');
          div.appendChild(link);
          div.appendChild(description);
          resultsDiv.appendChild(div);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = '<p>Error loading search data.</p>';
    });
});
