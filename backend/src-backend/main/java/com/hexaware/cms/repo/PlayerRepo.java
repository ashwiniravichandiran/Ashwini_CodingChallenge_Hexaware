package com.hexaware.cms.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cms.entity.Player;

public interface PlayerRepo extends JpaRepository<Player, Integer>{

}
