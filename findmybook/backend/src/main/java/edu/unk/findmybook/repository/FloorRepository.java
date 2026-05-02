
//this is a database helper or database acces layer

package edu.unk.findmybook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Floor;

// extending the interface JpaRepo (inherits all the methods and behavior defined by JpaRepository)
// lready defines many useful methods for database work, such as: save(), findAll(), findById, etc
public interface FloorRepository extends JpaRepository<Floor, Long> {
}