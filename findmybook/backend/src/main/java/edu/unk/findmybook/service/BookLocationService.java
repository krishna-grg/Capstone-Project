package edu.unk.findmybook.service;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import edu.unk.findmybook.dto.BookLocationResponse;
import edu.unk.findmybook.model.Book;
import edu.unk.findmybook.model.Shelf;
import edu.unk.findmybook.repository.BookRepository;
import edu.unk.findmybook.repository.ShelfRepository;

// service to find the location of a book based on its call number and the shelf ranges
@Service
public class BookLocationService {

    private final BookRepository bookRepository;
    private final ShelfRepository shelfRepository;

    public BookLocationService(BookRepository bookRepository, ShelfRepository shelfRepository) {

        this.bookRepository = bookRepository;
        this.shelfRepository = shelfRepository;
    }

    //
    @Cacheable(value = "bookLocations", key = "#bookId")
    public BookLocationResponse findBookLocation(Long bookId) {
        // for debugging, log when we have a cache miss and hit the database
        System.out.println("DATABASE HIT: finding book location for bookId = " + bookId);

        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (bookOpt.isEmpty()) {
            return null;
        }

        Book book = bookOpt.get();
        List<Shelf> shelves = shelfRepository.findAll();

        // find the shelf that contains the book using on call number range
        for (Shelf shelf : shelves) {
            boolean isBookInShelfRange = LcCallNumberUtils.isWithinRange(
                book.getCallNumberFull(),
                shelf.getRangeStart(),
                shelf.getRangeEnd()
            );

            if (isBookInShelfRange) {
                return new BookLocationResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getAuthor(),
                    shelf.getFloorName(),
                    book.getCallNumberFull(),
                    shelf.getId(),
                    shelf.getMapX(),
                    shelf.getMapY(),
                    shelf.getMapWidth(),
                    shelf.getMapHeight(),
                    shelf.getAccessNodeId()
                );
            }
        }

        return null;
    }
}


