package edu.unk.findmybook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Node;

public interface NodeRepository extends JpaRepository<Node, String> {

    List<Node> findByFloorName(String floorName);

    List<Node> findByType(String type);
}