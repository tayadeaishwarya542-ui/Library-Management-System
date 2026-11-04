<?php
session_start();

// Initialize sample books in PHP array
if (!isset($_SESSION['books'])) {
    $_SESSION['books'] = [
        ["id" => 1, "name" => "Clean Code", "author" => "Robert Martin", "status" => "Available"],
        ["id" => 2, "name" => "Let Us C", "author" => "Yashavant Kanetkar", "status" => "Available"]
    ];
}

$action = $_GET['action'] ?? ($_POST['action'] ?? '');

// 1. Get all books
if ($action === 'get') {
    echo json_encode(array_values($_SESSION['books']));
    exit;
}

// 2. Add a new book
if ($action === 'add') {
    $name = trim($_POST['name'] ?? ($_REQUEST['name'] ?? ''));
    $author = trim($_POST['author'] ?? ($_REQUEST['author'] ?? ''));

    if ($name !== '' && $author !== '') {
        // Find maximum existing numeric ID to prevent collisions
        $maxId = 0;
        foreach ($_SESSION['books'] as $b) {
            if (is_numeric($b['id']) && (int)$b['id'] > $maxId) {
                $maxId = (int)$b['id'];
            }
        }
        $id = ($maxId > 0) ? ($maxId + 1) : (count($_SESSION['books']) + 1);

        $newBook = [
            "id" => $id,
            "name" => $name,
            "author" => $author,
            "status" => "Available"
        ];
        $_SESSION['books'][] = $newBook;
        session_write_close();

        echo json_encode([
            "status" => "success",
            "message" => "Book Added Successfully!",
            "book" => $newBook,
            "books" => array_values($_SESSION['books'])
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Please enter both Book Name and Author Name!"
        ]);
    }
    exit;
}

// 3. Issue a book
if ($action === 'issue') {
    $id = $_REQUEST['id'] ?? ($_GET['id'] ?? ($_POST['id'] ?? ''));
    foreach ($_SESSION['books'] as &$book) {
        if ((string)$book['id'] === (string)$id) {
            $book['status'] = 'Issued';
            break;
        }
    }
    session_write_close();
    echo json_encode(["status" => "success"]);
    exit;
}

// 4. Return a book
if ($action === 'return') {
    $id = $_REQUEST['id'] ?? ($_GET['id'] ?? ($_POST['id'] ?? ''));
    foreach ($_SESSION['books'] as &$book) {
        if ((string)$book['id'] === (string)$id) {
            $book['status'] = 'Available';
            break;
        }
    }
    session_write_close();
    echo json_encode(["status" => "success"]);
    exit;
}
?>
