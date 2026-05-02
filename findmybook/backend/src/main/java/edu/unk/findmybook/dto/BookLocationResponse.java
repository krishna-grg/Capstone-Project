package edu.unk.findmybook.dto;

import java.io.Serializable;

//data transfer object for book location response, contains book info and location info to be sent to frontend
public class BookLocationResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long bookId;
    private String title;
    private String author;
    private String location;
    private String callNumber;
    private String shelfId;

    private Integer mapX;
    private Integer mapY;
    private Integer mapWidth;
    private Integer mapHeight;
    private String accessNodeId;

    public BookLocationResponse(Long bookId, String title, String author,
                                String location, String callNumber, String shelfId,
                                Integer mapX, Integer mapY,
                                Integer mapWidth, Integer mapHeight,
                                String accessNodeId) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.location = location;
        this.callNumber = callNumber;
        this.shelfId = shelfId;
        this.mapX = mapX;
        this.mapY = mapY;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.accessNodeId = accessNodeId;
    }

    public Long getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getLocation() {
        return location;
    }

    public String getCallNumber() {
        return callNumber;
    }

    public String getShelfId() {
        return shelfId;
    }

    public Integer getMapX() {
        return mapX;
    }

    public Integer getMapY() {
        return mapY;
    }

    public Integer getMapWidth() {
        return mapWidth;
    }

    public Integer getMapHeight() {
        return mapHeight;
    }

    public String getAccessNodeId() {
        return accessNodeId;
    }
}