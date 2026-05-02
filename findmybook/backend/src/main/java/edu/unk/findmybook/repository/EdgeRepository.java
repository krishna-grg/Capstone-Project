package edu.unk.findmybook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Edge;

public interface EdgeRepository extends JpaRepository<Edge, String> {

    List<Edge> findByFromNodeId(String fromNodeId);

    List<Edge> findByToNodeId(String toNodeId);

    boolean existsByFromNodeIdAndToNodeId(String fromNodeId, String toNodeId);
}