package edu.unk.findmybook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Shelf;

public interface ShelfRepository extends JpaRepository<Shelf, String> {

    List<Shelf> findByFloorName(String floorName);

    List<Shelf> findByAccessNodeId(String accessNodeId);
}