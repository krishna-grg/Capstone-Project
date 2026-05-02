package edu.unk.findmybook.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import edu.unk.findmybook.model.Shelf;
import edu.unk.findmybook.repository.ShelfRepository;

@RestController
@RequestMapping("/api/shelves")
public class ShelfController {

    private final ShelfRepository shelfRepository;

    public ShelfController(ShelfRepository shelfRepository) {
        this.shelfRepository = shelfRepository;
    }

    @GetMapping
    public List<Shelf> getAllShelves() {
        return shelfRepository.findAll();
    }

    @GetMapping("/{id}")
    public Shelf getShelfById(@PathVariable String id) {
        Optional<Shelf> shelf = shelfRepository.findById(id);
        return shelf.orElse(null);
    }

    @GetMapping("/floor/{floorName}")
    public List<Shelf> getShelvesByFloorName(@PathVariable String floorName) {
        return shelfRepository.findByFloorName(floorName);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Shelf createShelf(@RequestBody Shelf shelf) {
        return shelfRepository.save(shelf);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public List<Shelf> createShelves(@RequestBody List<Shelf> shelves) {
        return shelfRepository.saveAll(shelves);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Shelf updateShelf(@PathVariable String id, @RequestBody Shelf updatedShelf) {
        Optional<Shelf> existingShelf = shelfRepository.findById(id);

        if (existingShelf.isPresent()) {
            Shelf shelf = existingShelf.get();

            shelf.setFloorName(updatedShelf.getFloorName());
            shelf.setMapX(updatedShelf.getMapX());
            shelf.setMapY(updatedShelf.getMapY());
            shelf.setMapWidth(updatedShelf.getMapWidth());
            shelf.setMapHeight(updatedShelf.getMapHeight());
            shelf.setAccessNodeId(updatedShelf.getAccessNodeId());
            shelf.setRangeStart(updatedShelf.getRangeStart());
            shelf.setRangeEnd(updatedShelf.getRangeEnd());

            return shelfRepository.save(shelf);
        }

        return null;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteShelf(@PathVariable String id) {
        shelfRepository.deleteById(id);
    }
}