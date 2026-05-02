package edu.unk.findmybook.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unk.findmybook.model.Edge;
import edu.unk.findmybook.repository.EdgeRepository;

@RestController
@RequestMapping("/api/edges")
public class EdgeController {

    private final EdgeRepository edgeRepository;

    public EdgeController(EdgeRepository edgeRepository) {
        this.edgeRepository = edgeRepository;
    }

    @GetMapping
    public List<Edge> getAllEdges() {
        return edgeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Edge getEdgeById(@PathVariable String id) {
        Optional<Edge> edge = edgeRepository.findById(id);
        return edge.orElse(null);
    }

    @GetMapping("/from/{fromNodeId}")
    public List<Edge> getEdgesFromNode(@PathVariable String fromNodeId) {
        return edgeRepository.findByFromNodeId(fromNodeId);
    }

    @PostMapping
    public Edge createEdge(@RequestBody Edge edge) {
        return edgeRepository.save(edge);
    }

    //bulk endpoint to create multiple edges at one time
    @PostMapping("/bulk")
    public List<Edge> createEdges(@RequestBody List<Edge> edges) {
        return edgeRepository.saveAll(edges);
    }

    @GetMapping("/exists")
        public boolean edgeExists(
                @RequestParam String fromNodeId,
                @RequestParam String toNodeId
        ) {
            return edgeRepository.existsByFromNodeIdAndToNodeId(fromNodeId, toNodeId);
        }

    @DeleteMapping("/{id}")
    public void deleteEdge(@PathVariable String id) {
        edgeRepository.deleteById(id);
    }
}
