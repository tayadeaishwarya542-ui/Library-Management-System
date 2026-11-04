# 📚 Online Library Management System (PHP Mini Project)

A simple, beginner-friendly web development mini project developed using **HTML, CSS, JavaScript, and PHP** (No MySQL required).

---

## 🌟 Technologies Used

* **HTML5:** Webpage structure, forms, and tables
* **CSS3 & Bootstrap 5:** Light blue and white styling, cards, and responsive layout
* **JavaScript (Vanilla JS):** Form validation, instant book search, and DOM manipulation
* **PHP:** Server-side processing and session-based book data storage (`$_SESSION['books']`)

---

## 📂 Project Structure

```text
library/
├── index.html     # User Interface: Navbar, Add Book Form, Search bar, and Books Table
├── style.css      # Light blue & white custom stylesheet with status badges
├── script.js      # JavaScript for validation, DOM table rendering, search, issue & return
├── library.php    # PHP script handling Add, Get, Issue, and Return actions via Session
└── README.md      # Instructions & viva presentation guide
```

---

## 🚀 How to Run the Project Using XAMPP

### Step 1: Place Files in `htdocs`
The project is already pre-copied directly to your XAMPP folder:
```text
C:\xampp\htdocs\library
```
*(If moving to another computer, simply copy the `library` folder inside `C:\xampp\htdocs\`)*

### Step 2: Start Apache in XAMPP Control Panel
1. Open the **XAMPP Control Panel**.
2. Click the **Start** button next to **Apache**.
*(You do not need to start MySQL!)*

### Step 3: Open in Browser
Open Google Chrome, Edge, or any browser and type:
```text
http://localhost/library
```
or
```text
http://localhost/library/index.html
```

---

## 💡 How to Explain This Project to Your Teacher (Viva Q&A)

1. **How is data stored without MySQL?**
   > *"Teacher, we are using PHP Sessions (`$_SESSION['books']`). When the page loads, PHP creates an in-memory array holding the books. Any newly added, issued, or returned book updates this session array."*

2. **How does the search feature work?**
   > *"The search works completely on the client side using JavaScript DOM manipulation. As the user types in the search input box, the `searchBooks()` function reads the table rows and compares the book name using `.toLowerCase()` and `.includes()`. Matching rows remain visible while non-matching rows are hidden using `style.display = 'none'`."*

3. **How does form validation work?**
   > *"Before sending data to PHP, the JavaScript function `addBook(event)` checks whether Book ID, Book Name, or Author Name is empty. If any field is blank, it prevents submission, focuses on the input field, and displays a friendly warning alert."*

4. **How do Issue and Return work?**
   > *"When you click 'Issue', JavaScript sends an asynchronous `fetch()` POST request to `library.php?action=issueBook`. PHP finds the book by its ID and updates its status to 'Issued'. When 'Return' is clicked, the status changes back to 'Available'."*
