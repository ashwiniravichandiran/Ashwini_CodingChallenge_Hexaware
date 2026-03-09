package com.hexaware.cms.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cms.dto.RequestDTO;
import com.hexaware.cms.dto.ResponseDTO;
import com.hexaware.cms.service.PlayerServiceImpl;



@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    PlayerServiceImpl service;

    @GetMapping
    public List<ResponseDTO> getPlayers(){
        return service.getAllPlayers();
    }

    @PostMapping
    public ResponseDTO addPlayer(@RequestBody RequestDTO player){
        return service.addPlayer(player);
    }

    @GetMapping("/{id}")
    public ResponseDTO getPlayer(@PathVariable int id){
        return service.getPlayerById(id);
    }

    @PutMapping("/{id}")
    public ResponseDTO updatePlayer(@PathVariable int id, @RequestBody RequestDTO player){
        return service.updatePlayer(id, player);
    }

    @DeleteMapping("/{id}")
    public String deletePlayer(@PathVariable int id){
        service.deletePlayer(id);
        return "Player deleted successfully";
    }
}