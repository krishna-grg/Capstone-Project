package edu.unk.findmybook.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unk.findmybook.model.Node;
import edu.unk.findmybook.service.PathfindingService;

@RestController
@RequestMapping("/api/path")
public class PathController {

    private final PathfindingService pathfindingService;

    public PathController(PathfindingService pathfindingService) {
        this.pathfindingService = pathfindingService;
    }

    @GetMapping
    public List<Node> getPath(
            @RequestParam String start,
            @RequestParam String target
    ) {
        return pathfindingService.findPath(start, target);
    }
}