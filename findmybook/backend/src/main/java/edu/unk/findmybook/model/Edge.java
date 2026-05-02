package edu.unk.findmybook.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "edges")
public class Edge {

    @Id
    private String id;

    @Column(nullable = false)
    private String fromNodeId;

    @Column(nullable = false)
    private String toNodeId;

    public Edge() {
    }

    public Edge(String id, String fromNodeId, String toNodeId) {
        this.id = id;
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFromNodeId() {
        return fromNodeId;
    }

    public void setFromNodeId(String fromNodeId) {
        this.fromNodeId = fromNodeId;
    }

    public String getToNodeId() {
        return toNodeId;
    }

    public void setToNodeId(String toNodeId) {
        this.toNodeId = toNodeId;
    }
}