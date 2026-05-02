package edu.unk.findmybook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shelves")
public class Shelf {

    @Id
    private String id;

    @Column(nullable = false)
    private String floorName;

    @Column(name = "map_x", nullable = false)
    private Integer mapX; // top left corner x of svg map

    @Column(name = "map_y", nullable = false)
    private Integer mapY;   // top left corner y of svg map

    @Column(name = "map_width", nullable = false)
    private Integer mapWidth; //   width of the shelf on svg map, used for displaying the shelf on frontend

    @Column(name = "map_height", nullable = false)
    private Integer mapHeight;

    @Column(nullable = false)
    private String accessNodeId; //the node id of the access node for this shelf,

    @Column(nullable = false)
    private String rangeStart; // LC classification range start, like "QA76.73"

    @Column(nullable = false)
    private String rangeEnd; //the end of the LC classification range for this shelf, 


    public Shelf() { 
    }

    public Shelf(String id, String floorName, Integer mapX, Integer mapY, Integer mapWidth, Integer mapHeight,
                 String accessNodeId, String rangeStart, String rangeEnd) {
        this.id = id;
        this.floorName = floorName;
        this.mapX = mapX;
        this.mapY = mapY;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.accessNodeId = accessNodeId;
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFloorName() {
        return floorName;
    }

    public void setFloorName(String floorName) {
        this.floorName = floorName;
    }

    public Integer getMapX() {
        return mapX;
    }

    public void setMapX(Integer mapX) {
        this.mapX = mapX;
    }

    public Integer getMapY() {
        return mapY;
    }

    public void setMapY(Integer mapY) {
        this.mapY = mapY;
    }

    public Integer getMapWidth() {
        return mapWidth;
    }

    public void setMapWidth(Integer mapWidth) {
        this.mapWidth = mapWidth;
    }

    public Integer getMapHeight() {
        return mapHeight;
    }

    public void setMapHeight(Integer mapHeight) {
        this.mapHeight = mapHeight;
    }

    public String getAccessNodeId() {
        return accessNodeId;
    }

    public void setAccessNodeId(String accessNodeId) {
        this.accessNodeId = accessNodeId;
    }

    public String getRangeStart() {
        return rangeStart;
    }

    public void setRangeStart(String rangeStart) {
        this.rangeStart = rangeStart;
    }

    public String getRangeEnd() {
        return rangeEnd;
    }

    public void setRangeEnd(String rangeEnd) {
        this.rangeEnd = rangeEnd;
    }
}