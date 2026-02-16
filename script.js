async function searchBooks() {
  const query = document.getElementById("bookInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    alert("نام کتاب را وارد کنید");
    return;
  }

  resultsDiv.innerHTML = "⏳ در حال جستجو...";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!data.docs.length) {
      resultsDiv.innerHTML = "❌ نتیجه‌ای پیدا نشد";
      return;
    }

    resultsDiv.innerHTML = "";

    data.docs.slice(0, 12).forEach(book => {
      const div = document.createElement("div");
      div.className = "book-card";

      div.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-meta">
          <span>👤 ${book.author_name ? book.author_name[0] : "نامشخص"}</span>
          <span>📅 ${book.first_publish_year || "-"}</span>
        </div>
      `;

      resultsDiv.appendChild(div);
    });

  } catch (error) {
    resultsDiv.innerHTML = "❌ خطا در دریافت اطلاعات";
  }
}
