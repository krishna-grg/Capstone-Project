package edu.unk.findmybook.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unk.findmybook.model.Floor;
import edu.unk.findmybook.repository.FloorRepository;

@RestController
@RequestMapping("/api/floors")
public class FloorController {

    private final FloorRepository floorRepository;

    public FloorController(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
    }

    @GetMapping
    public List<Floor> getAllFloors() {
        return floorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Floor getFloorById(@PathVariable Long id) {
        Optional<Floor> floor = floorRepository.findById(id);
        return floor.orElse(null);
    }

    @PostMapping
    public Floor createFloor(@RequestBody Floor floor) {
        return floorRepository.save(floor);
    }

    @PutMapping("/{id}")
    public Floor updateFloor(@PathVariable Long id, @RequestBody Floor updatedFloor) {
        Optional<Floor> existingFloor = floorRepository.findById(id);

        if (existingFloor.isPresent()) {
            Floor floor = existingFloor.get();
            floor.setName(updatedFloor.getName());
            floor.setBuildingName(updatedFloor.getBuildingName());
            floor.setSvgMapName(updatedFloor.getSvgMapName());
            floor.setMapWidth(updatedFloor.getMapWidth());
            floor.setMapHeight(updatedFloor.getMapHeight());

            return floorRepository.save(floor);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteFloor(@PathVariable Long id) {
        floorRepository.deleteById(id);
    }
}