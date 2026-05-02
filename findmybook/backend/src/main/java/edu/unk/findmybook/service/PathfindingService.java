package edu.unk.findmybook.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;

import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

import org.springframework.stereotype.Service;

import edu.unk.findmybook.model.Edge;
import edu.unk.findmybook.model.Node;
import edu.unk.findmybook.repository.EdgeRepository;
import edu.unk.findmybook.repository.NodeRepository;

// service to find the shortest path between two nodes using Dijkstra's algorithm
@Service
public class PathfindingService {

    // repositories to access nodes and edges from the database
    private final NodeRepository nodeRepository;
    private final EdgeRepository edgeRepository;

    public PathfindingService(NodeRepository nodeRepository, EdgeRepository edgeRepository) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    // shortest path , djikstra's algorithm
    public List<Node> findPath(String startNodeId, String targetNodeId) {
        // maps to store the distance from the start node to each node and the previous node in the path
        Map<String, Double> distance = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        Set<String> visited = new HashSet<>();

        //priority queue to store nodes to visit ordered by distance from the start node
        PriorityQueue<String> queue = new PriorityQueue<>( 
                Comparator.comparingDouble(id -> distance.getOrDefault(id, Double.MAX_VALUE))
        );

        // start with initializing distances to all nodes as infinity except the start node  0, 
        for (Node node : nodeRepository.findAll()) {
            distance.put(node.getId(), Double.MAX_VALUE);
        }

        // add the start node to the queue with distance 0
        distance.put(startNodeId, 0.0);
        queue.add(startNodeId);

        // main loop of Dijkstra's algorithm
        while (!queue.isEmpty()) {
            String currentId = queue.poll();

            if (visited.contains(currentId)) {
                continue;
            }

            visited.add(currentId);

            if (currentId.equals(targetNodeId)) {
                break;
            }

            Node currentNode = nodeRepository.findById(currentId).orElse(null);

            if (currentNode == null) {
                continue;
            }

            // all edges from the current node
            List<Edge> edges = edgeRepository.findByFromNodeId(currentId);

            for (Edge edge : edges) {
                Node neighbor = nodeRepository.findById(edge.getToNodeId()).orElse(null);

                if (neighbor == null) {
                    continue;
                }

                double edgeWeight = calculateDistance(currentNode, neighbor);
                double newDistance = distance.get(currentId) + edgeWeight;
                // if the new distance to the neighbor is shorter than the previously known distance, update the distance and previous node, 
                // and add the neighbor to the queue
                if (newDistance < distance.getOrDefault(neighbor.getId(), Double.MAX_VALUE)) {
                    distance.put(neighbor.getId(), newDistance);
                    previous.put(neighbor.getId(), currentId);
                    queue.add(neighbor.getId());
                }
            }
        }

        //path build, backtrack from target node to start node
        return buildPath(previous, startNodeId, targetNodeId);
    }

    private double calculateDistance(Node from, Node to) {
        return Math.abs(from.getX() - to.getX()) + Math.abs(from.getY() - to.getY());
    }

    // build the path from the previous node map, starting from the target node and backtracking to the start node
    private List<Node> buildPath(Map<String, String> previous, String startNodeId, String targetNodeId) {
        List<Node> path = new ArrayList<>(); // path to store the nodes in the path
        String current = targetNodeId;  

        // backtrack
        while (current != null) {
            Node node = nodeRepository.findById(current).orElse(null);

            if (node != null) {
                path.add(node);
            }

            if (current.equals(startNodeId)) {
                break;
            }
            // move to the previous node in the path
            current = previous.get(current);
        }

        Collections.reverse(path);// reverse

        if (path.isEmpty() || !path.get(0).getId().equals(startNodeId)) {
            return new ArrayList<>();
        }

        return path;
    }
}
