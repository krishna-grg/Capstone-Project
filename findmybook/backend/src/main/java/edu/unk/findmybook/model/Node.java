package edu.unk.findmybook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nodes")
public class Node {

    @Id
    private String id;

    @Column(nullable = false)
    private String floorName;

    @Column(nullable = false)
    private Integer x; // top left corner x of svg map

    @Column(nullable = false)
    private Integer y; // top left corner y of svg map

    @Column(nullable = false)
    private String type; // what kind of node, like "intersection", "shelf", "elevator", etc

    public Node() {
    }

    public Node(String id, String floorName, Integer x, Integer y, String type) {
        this.id = id;
        this.floorName = floorName;
        this.x = x;
        this.y = y;
        this.type = type;
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

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}