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

import edu.unk.findmybook.model.Node;
import edu.unk.findmybook.repository.NodeRepository;

@RestController
@RequestMapping("/api/nodes")
public class NodeController {

    private final NodeRepository nodeRepository;

    public NodeController(NodeRepository nodeRepository) {
        this.nodeRepository = nodeRepository;
    }

    @GetMapping
    public List<Node> getAllNodes() {
        return nodeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Node getNodeById(@PathVariable String id) {
        Optional<Node> node = nodeRepository.findById(id);
        return node.orElse(null);
    }

    @GetMapping("/floor/{floorName}")
    public List<Node> getNodesByFloorName(@PathVariable String floorName) {
        return nodeRepository.findByFloorName(floorName);
    }

    @GetMapping("/type/{type}")
    public List<Node> getNodesByType(@PathVariable String type) {
        return nodeRepository.findByType(type);
    }

    @PostMapping
    public Node createNode(@RequestBody Node node) {
        return nodeRepository.save(node);
    }

    @PostMapping("/bulk")
    public List<Node> createNodes(@RequestBody List<Node> nodes) {
        return nodeRepository.saveAll(nodes);
    }

    @PutMapping("/{id}")
    public Node updateNode(@PathVariable String id, @RequestBody Node updatedNode) {
        Optional<Node> existingNode = nodeRepository.findById(id);

        if (existingNode.isPresent()) {
            Node node = existingNode.get();
            node.setFloorName(updatedNode.getFloorName());
            node.setX(updatedNode.getX());
            node.setY(updatedNode.getY());
            node.setType(updatedNode.getType());

            return nodeRepository.save(node);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteNode(@PathVariable String id) {
        nodeRepository.deleteById(id);
    }
}