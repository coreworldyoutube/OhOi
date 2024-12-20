<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>埋め込みコードジェネレーター</title>
</head>
<body>
  <h1>埋め込みコードジェネレーター</h1>

  <!-- URL 入力フォーム -->
  <input type="text" id="embed-url" placeholder="埋め込みたい URL を入力">
  <button id="generate-embed">埋め込みコードを生成</button>

  <!-- 埋め込みコード表示部分 -->
  <div id="embed-code-container"></div>

  <!-- 検索ボックス -->
  <input type="text" id="search-box" placeholder="検索クエリを入力">
  <button id="search-button">検索</button>

  <!-- 検索結果の表示部分 -->
  <div id="results"></div>

  <script>
    // 埋め込みコード生成機能
    function generateEmbedCode(url) {
      let embedCode = '';
      
      // YouTube の埋め込みコード生成
      if (url.match(/https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/)) {
        const videoId = url.match(/https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/)[1];
        embedCode = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        `;
      }

      // Scratch プロジェクトの埋め込みコード生成
      // Scratch プロジェクトの埋め込みコード生成
      else if (url.match(/https:\/\/scratch\.mit\.edu\/projects\/(\d+)/)) {
        const projectId = url.match(/https:\/\/scratch\.mit\.edu\/projects\/(\d+)/)[1];
        embedCode = `
        <iframe src="https://scratch.mit.edu/projects/${projectId}/embed" width="485" height="402" frameborder="0" 
        scrolling="no" allowtransparency="true" allowfullscreen></iframe>
        `;
      }


      // Vimeo の埋め込みコード生成
      else if (url.match(/https:\/\/vimeo\.com\/(\d+)/)) {
        const videoId = url.match(/https:\/\/vimeo\.com\/(\d+)/)[1];
        embedCode = `
          <iframe src="https://player.vimeo.com/video/${videoId}" width="640" height="360" frameborder="0" 
                  allow="autoplay; fullscreen" allowfullscreen></iframe>
        `;
      }

      return embedCode;
    }

    // 埋め込みコードを表示する関数
    function showEmbedCode(embedCode) {
      const embedContainer = document.getElementById('embed-code-container');
      embedContainer.innerHTML = `<p>以下の埋め込みコードをコピーしてウェブサイトに貼り付けてください:</p><pre>${embedCode}</pre>`;
    }

    // 検索機能の統合
    document.getElementById('search-button').addEventListener('click', () => {
      const query = document.getElementById('search-box').value.trim().toLowerCase(); // 入力クエリを取得
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // 検索結果をリセット

      if (query === '') {
        resultsDiv.innerHTML = '<p>検索クエリを入力してください。</p>'; // クエリが空の場合の処理
        return;
      }

      // JSONデータをフェッチ
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          // クエリに一致する結果をフィルタリング
          const results = data.filter(item =>
            (item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)) && 
            item.url !== '#NONE' && item.url !== 'NONE' // NONE や # の場合は結果に含めない
          );

          if (results.length === 0) {
            resultsDiv.innerHTML = '<p>該当する結果はありません。</p>'; // ヒットがない場合の処理
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

              // 埋め込み可能な場合、埋め込みコードも生成
              const embedCode = generateEmbedCode(result.url);
              if (embedCode) {
                div.innerHTML += `<p>以下の埋め込みコードを使って、ページに埋め込むことができます:</p><pre>${embedCode}</pre>`;
              }

              resultsDiv.appendChild(div);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error); // エラー時の処理
          resultsDiv.innerHTML = '<p>検索データの読み込み中にエラーが発生しました。</p>';
        });
    });
  </script>
</body>
</html>
