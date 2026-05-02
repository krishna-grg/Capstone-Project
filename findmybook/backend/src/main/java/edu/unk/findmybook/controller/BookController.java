package edu.unk.findmybook.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import edu.unk.findmybook.dto.BookLocationResponse;
import edu.unk.findmybook.model.Book;
import edu.unk.findmybook.repository.BookRepository;
import edu.unk.findmybook.service.BookLocationService;


// controller for book related endpoints, related crud operations 

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;
    private final BookLocationService bookLocationService;

    public BookController(BookRepository bookRepository, BookLocationService bookLocationService) {
        this.bookRepository = bookRepository;
        this.bookLocationService = bookLocationService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.orElse(null);
    }

    @GetMapping("/search/title")
    public List<Book> searchByTitle(@RequestParam String q) {
        return bookRepository.findByTitleContainingIgnoreCase(q);
    }

    @GetMapping("/search/author")
    public List<Book> searchByAuthor(@RequestParam String q) {
        return bookRepository.findByAuthorContainingIgnoreCase(q);
    }

    @GetMapping("/search/class")
    public List<Book> searchByClassLetters(@RequestParam String q) {
        return bookRepository.findByClassLetters(q);
    }

    @GetMapping("/search/status")
    public List<Book> searchByStatus(@RequestParam String q) {
        return bookRepository.findByStatus(q);
    }

    @GetMapping("/{id}/location")
    public BookLocationResponse getBookLocation(@PathVariable Long id) {
        return bookLocationService.findBookLocation(id);
    }

    //restict create, update, delete
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Optional<Book> existingBook = bookRepository.findById(id);

        if (existingBook.isPresent()) {
            Book book = existingBook.get();

            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setIsbn(updatedBook.getIsbn());
            book.setCallNumberFull(updatedBook.getCallNumberFull());
            book.setClassLetters(updatedBook.getClassLetters());
            book.setClassNumber(updatedBook.getClassNumber());
            book.setCutter1(updatedBook.getCutter1());
            book.setCutter2(updatedBook.getCutter2());
            book.setPublicationYear(updatedBook.getPublicationYear());
            book.setStatus(updatedBook.getStatus());

            return bookRepository.save(book);
        }

        return null;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}