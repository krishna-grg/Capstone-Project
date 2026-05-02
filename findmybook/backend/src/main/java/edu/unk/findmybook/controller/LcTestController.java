package edu.unk.findmybook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unk.findmybook.service.LcCallNumberUtils;

@RestController
public class LcTestController {

    //compare two LC call numbers, return -1 if l<r, 0 if equal, 1 if l>r
    @GetMapping("/api/lc/compare")
    public int compare(@RequestParam String left, @RequestParam String right) {
        return LcCallNumberUtils.compare(left, right);
    }
}