package edu.unk.findmybook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "floors")
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String buildingName;

    @Column(nullable = false)
    private String svgMapName;

    @Column(name = "map_width", nullable = false)
    private Integer mapWidth;

    @Column(name = "map_height", nullable = false)
    private Integer mapHeight;

    public Floor() {
    }

    public Floor(String name, String buildingName, String svgMapName, Integer mapWidth, Integer mapHeight) {
        this.name = name;
        this.buildingName = buildingName;
        this.svgMapName = svgMapName;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getSvgMapName() {
        return svgMapName;
    }

    public void setSvgMapName(String svgMapName) {
        this.svgMapName = svgMapName;
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
}