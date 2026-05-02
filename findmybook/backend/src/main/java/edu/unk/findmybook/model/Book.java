package edu.unk.findmybook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//entity class for book
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String author;

    @Column(unique = true)
    private String isbn;

    @Column(nullable = false)
    private String callNumberFull;

    @Column(nullable = false)
    private String classLetters;

    @Column(nullable = false)
    private Double classNumber;

    private String cutter1;
    private String cutter2;
    private Integer publicationYear;

    @Column(nullable = false)
    private String status;

    public Book() {
    }

    public Book(String title, String author, String isbn, String callNumberFull,
                String classLetters, Double classNumber, String cutter1,
                String cutter2, Integer publicationYear, String status) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.callNumberFull = callNumberFull;
        this.classLetters = classLetters;
        this.classNumber = classNumber;
        this.cutter1 = cutter1;
        this.cutter2 = cutter2;
        this.publicationYear = publicationYear;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCallNumberFull() {
        return callNumberFull;
    }

    public void setCallNumberFull(String callNumberFull) {
        this.callNumberFull = callNumberFull;
    }

    public String getClassLetters() {
        return classLetters;
    }

    public void setClassLetters(String classLetters) {
        this.classLetters = classLetters;
    }

    public Double getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(Double classNumber) {
        this.classNumber = classNumber;
    }

    public String getCutter1() {
        return cutter1;
    }

    public void setCutter1(String cutter1) {
        this.cutter1 = cutter1;
    }

    public String getCutter2() {
        return cutter2;
    }

    public void setCutter2(String cutter2) {
        this.cutter2 = cutter2;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(Integer publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}