package edu.unk.findmybook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    List<Book> findByClassLetters(String classLetters);

    List<Book> findByStatus(String status);
}

