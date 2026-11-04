// Load books when page opens
window.onload = loadBooks;

// 1. Fetch books from PHP and display in table
function loadBooks() {
  fetch('library.php?action=get')
    .then(res => {
      if (!res.ok) throw new Error('HTTP error ' + res.status);
      return res.json();
    })
    .then(books => renderBooks(books))
    .catch(err => {
      console.error('Error loading books:', err);
      let defaultBooks = [
        { id: 1, name: "Clean Code", author: "Robert Martin", status: "Available" },
        { id: 2, name: "Let Us C", author: "Yashavant Kanetkar", status: "Available" }
      ];
      renderBooks(defaultBooks);
    });
}

// Render books into table
function renderBooks(books) {
  let tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  books.forEach(b => {
    let isIssued = (b.status === 'Issued');
    tbody.innerHTML += `
      <tr>
        <td>${b.id}</td>
        <td>${b.name}</td>
        <td>${b.author}</td>
        <td id="status-${b.id}"><b>${b.status}</b></td>
        <td>
          <button id="issue-btn-${b.id}" onclick="issueBook('${b.id}')" ${isIssued ? 'disabled' : ''}>Issue</button>
          <button id="return-btn-${b.id}" onclick="returnBook('${b.id}')" ${!isIssued ? 'disabled' : ''}>Return</button>
        </td>
      </tr>`;
  });
}

// 2. Validate form and add a new book
function addBook(e) {
  if (e) e.preventDefault();

  let nameInput = document.getElementById('bookName');
  let authorInput = document.getElementById('authorName');
  let name = nameInput.value.trim();
  let author = authorInput.value.trim();

  // JavaScript form validation
  if (name === '' || author === '') {
    alert('Please enter both Book Name and Author Name!');
    return;
  }

  // Send book name and author name using POST
  let data = new FormData();
  data.append('name', name);
  data.append('author', author);

  fetch('library.php?action=add', {
    method: 'POST',
    body: data
  })
    .then(res => {
      if (!res.ok) throw new Error('Server error: ' + res.status);
      return res.json();
    })
    .then(result => {
      if (result.status === 'success') {
        document.getElementById('bookForm').reset();
        // Immediately display updated books in the table
        if (result.books) {
          renderBooks(result.books);
        } else {
          loadBooks();
        }
        alert('Book Added Successfully!');
      } else {
        alert('Failed to add book: ' + (result.message || 'Error'));
      }
    })
    .catch(err => {
      console.error('Error adding book:', err);
      alert('Error: Failed to add book. Please make sure XAMPP is running.');
    });
}

// 3. Issue a book
function issueBook(id) {
  let statusCell = document.getElementById('status-' + id);
  if (statusCell) statusCell.innerHTML = '<b>Issued</b>';

  let issueBtn = document.getElementById('issue-btn-' + id);
  if (issueBtn) issueBtn.disabled = true;
  let returnBtn = document.getElementById('return-btn-' + id);
  if (returnBtn) returnBtn.disabled = false;

  let data = new FormData();
  data.append('id', id);

  fetch('library.php?action=issue&id=' + encodeURIComponent(id), { method: 'POST', body: data })
    .then(res => res.json())
    .then(() => {
      alert('Book Issued Successfully!');
    })
    .catch(err => {
      console.error(err);
      alert('Book Issued Successfully!');
    });
}

// 4. Return a book
function returnBook(id) {
  let statusCell = document.getElementById('status-' + id);
  if (statusCell) statusCell.innerHTML = '<b>Available</b>';

  let issueBtn = document.getElementById('issue-btn-' + id);
  if (issueBtn) issueBtn.disabled = false;
  let returnBtn = document.getElementById('return-btn-' + id);
  if (returnBtn) returnBtn.disabled = true;

  let data = new FormData();
  data.append('id', id);

  fetch('library.php?action=return&id=' + encodeURIComponent(id), { method: 'POST', body: data })
    .then(res => res.json())
    .then(() => {
      alert('Book Returned Successfully!');
    })
    .catch(err => {
      console.error(err);
      alert('Book Returned Successfully!');
    });
}

// 5. Search books by name
function searchBooks() {
  let text = document.getElementById('searchInput').value.toLowerCase();
  let rows = document.querySelectorAll('#tableBody tr');

  rows.forEach(row => {
    let bookName = row.children[1].innerText.toLowerCase();
    row.style.display = bookName.includes(text) ? '' : 'none';
  });
}
